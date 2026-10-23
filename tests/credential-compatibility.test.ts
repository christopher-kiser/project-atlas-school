import "fake-indexeddb/auto";
import { IDBObjectStore } from "fake-indexeddb";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createInitialData,
  isPracticeScore,
  type CertificationScore,
} from "../src/lib/learning";
import {
  createStorage,
  exportBackup,
  mergeData,
  parseBackup,
  validateData,
} from "../src/lib/storage";

const at = "2026-10-01T09:00:00.000Z";
const legacy: CertificationScore = {
  id: "legacy-score",
  certificationId: "aws-clf",
  score: 88,
  at,
  source: "Timed practice, first form",
};
const credential: CertificationScore = {
  id: "credential-completion",
  certificationId: "aws-clf",
  score: 0,
  at: "2026-10-09T09:00:00.000Z",
  source: "Learner-reported provider completion",
  kind: "credential",
  credentialUrl: "https://example.com/credentials/learner-123",
};
function mixedData() {
  return {
    ...createInitialData(at),
    certifications: [
      legacy,
      { ...legacy, id: "explicit-practice", kind: "practice" as const },
      { ...legacy, id: "study-quiz", kind: "study" as const, score: 100 },
      credential,
    ],
  };
}
function storage() {
  return createStorage(`credential-test-${crypto.randomUUID()}`);
}
afterEach(() => vi.restoreAllMocks());

describe("Version-1 credential evidence compatibility", () => {
  it("round-trips old backups without adding fields or changing their evidence", () => {
    const old = { ...createInitialData(at), certifications: [legacy] };
    const restored = parseBackup(exportBackup(old));
    expect(restored).toEqual(old);
    expect(restored.version).toBe(1);
    expect(Object.keys(restored.certifications[0])).toEqual(
      Object.keys(legacy),
    );
    expect(restored.certifications[0]).not.toHaveProperty("kind");
  });

  it("round-trips mixed records without counting study or completion as exam practice", () => {
    const data = mixedData();
    expect(parseBackup(exportBackup(data))).toEqual(data);
    const practice = data.certifications.filter(isPracticeScore);
    expect(practice.map((record) => record.id)).toEqual([
      "legacy-score",
      "explicit-practice",
    ]);
    expect(practice.every((record) => record.score === 88)).toBe(true);
    expect(isPracticeScore(credential)).toBe(false);
    expect(isPracticeScore({ ...legacy, kind: "study", score: 100 })).toBe(
      false,
    );
    // The event discriminator remains decisive even before validation.
    expect(isPracticeScore({ ...credential, score: 100 })).toBe(false);
  });

  it("allows learner reports without a link and validates optional HTTP(S) links", () => {
    const withoutLink = { ...credential };
    delete withoutLink.credentialUrl;
    expect(
      validateData({
        ...createInitialData(at),
        certifications: [withoutLink],
      }).certifications[0],
    ).toEqual(withoutLink);
    expect(
      validateData({
        ...createInitialData(at),
        certifications: [
          { ...credential, credentialUrl: "http://example.com/credential" },
        ],
      }).certifications[0].credentialUrl,
    ).toBe("http://example.com/credential");
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,credential",
    "blob:https://example.com/credential",
    "https://user:password@example.com/credential",
    "https://example.com/credential with spaces",
    "https://example.com/\ncredential",
    "/credential/relative",
    "",
  ])("rejects unsafe completion URL %j", (credentialUrl) => {
    expect(() =>
      validateData({
        ...createInitialData(at),
        certifications: [{ ...credential, credentialUrl }],
      }),
    ).toThrow();
  });

  it("rejects ambiguous completion data and credential metadata on practice scores", () => {
    const invalid = [
      { ...credential, kind: "completed" },
      { ...credential, score: 85 },
      { ...credential, source: "  " },
      { ...legacy, credentialUrl: credential.credentialUrl },
      { ...legacy, kind: "practice", credentialUrl: credential.credentialUrl },
      { ...legacy, kind: "study", credentialUrl: credential.credentialUrl },
    ];
    for (const record of invalid) {
      expect(() =>
        validateData({
          ...createInitialData(at),
          certifications: [record],
        }),
      ).toThrow();
    }
  });

  it("deduplicates identical events and rejects conflicting immutable completion evidence", () => {
    const current = mixedData();
    const incoming = {
      ...createInitialData(at),
      certifications: [credential],
    };
    const merged = mergeData(current, incoming);
    expect(merged.certifications).toEqual(current.certifications);
    expect(mergeData(merged, incoming).certifications).toEqual(
      current.certifications,
    );
    expect(() =>
      mergeData(current, {
        ...incoming,
        certifications: [
          {
            ...credential,
            credentialUrl: "https://example.com/different-credential",
          },
        ],
      }),
    ).toThrow(/conflicting/);
    expect(() =>
      mergeData(current, {
        ...incoming,
        certifications: [{ ...legacy, id: credential.id, score: 0 }],
      }),
    ).toThrow(/conflicting/);
  });

  it("persists old and new evidence across clients and repeated imports", async () => {
    const name = `credential-test-${crypto.randomUUID()}`;
    const db = createStorage(name);
    await db.saveCertificationScore(legacy);
    await createStorage(name).saveCertificationScore(credential);
    const backup = exportBackup(await db.loadData());
    await db.importBackup(backup);
    await db.importBackup(backup);
    expect((await createStorage(name).loadData()).certifications).toEqual([
      legacy,
      credential,
    ]);
    expect((await db.loadData()).version).toBe(1);
  });

  it("keeps existing evidence when an import or completion save fails", async () => {
    const db = storage();
    await db.saveCertificationScore(legacy);
    await expect(async () =>
      db.importBackup(
        JSON.stringify({
          ...createInitialData(at),
          certifications: [
            { ...credential, credentialUrl: "javascript:alert(1)" },
          ],
        }),
      ),
    ).rejects.toThrow();
    const put = vi
      .spyOn(IDBObjectStore.prototype, "put")
      .mockImplementationOnce(() => {
        throw new DOMException("Full", "QuotaExceededError");
      });
    await expect(db.saveCertificationScore(credential)).rejects.toThrow(
      /storage is full/,
    );
    put.mockRestore();
    expect((await db.loadData()).certifications).toEqual([legacy]);
    await expect(
      db.saveCertificationScore({
        ...legacy,
        source: "Conflicting edit",
      }),
    ).rejects.toThrow(/conflicting/);
    expect((await db.loadData()).certifications).toEqual([legacy]);
  });
});
