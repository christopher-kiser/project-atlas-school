import {
  createInitialData,
  newId,
  type AtlasData,
  type Attachment,
  type CertificationScore,
  type ExerciseAttempt,
  type LabSubmission,
  type PriorEvidence,
  type ProjectSubmission,
} from "./learning";

export const DATABASE_NAME = "project-atlas-school";
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const MAX_BACKUP_BYTES = 50 * 1024 * 1024;
const MAX_EVENTS = 100_000;
const projectIds = new Set([
  "linux-service",
  "health-monitor",
  "aws-static",
  "aws-ha",
  "terraform-deploy",
  "container-app",
  "cicd-pipeline",
  "capstone",
]);
export class StorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "StorageError";
  }
}
function fail(message: string): never {
  throw new StorageError(message);
}
function record(value: unknown, name: string): Record<string, unknown> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Object.prototype
  )
    fail(`${name} must be an object.`);
  return value as Record<string, unknown>;
}
function keys(value: Record<string, unknown>, allowed: string[], name: string) {
  if (Object.keys(value).some((key) => !allowed.includes(key)))
    fail(`${name} contains unsupported fields.`);
}
function text(value: unknown, name: string, max = 100_000): string {
  if (typeof value !== "string" || value.length > max)
    fail(`${name} must be text of at most ${max} characters.`);
  return value;
}
function id(value: unknown, name: string): string {
  const result = text(value, name, 128);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(result))
    fail(`${name} has an invalid identifier.`);
  return result;
}
function bool(value: unknown, name: string): boolean {
  if (typeof value !== "boolean") fail(`${name} must be true or false.`);
  return value;
}
function time(value: unknown, name: string): string {
  const result = text(value, name, 24);
  const date = new Date(result);
  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString() !== result ||
    date.getUTCFullYear() < 2000 ||
    date.getUTCFullYear() > 2100
  )
    fail(`${name} must be a valid ISO timestamp.`);
  return result;
}
function list<T>(
  value: unknown,
  name: string,
  map: (item: unknown, name: string) => T,
  max = MAX_EVENTS,
): T[] {
  if (!Array.isArray(value) || value.length > max)
    fail(`${name} must be an array with at most ${max} items.`);
  return value.map((item, index) => map(item, `${name}[${index}]`));
}
function enumeration<T extends string>(
  value: unknown,
  options: readonly T[],
  name: string,
): T {
  if (typeof value !== "string" || !options.includes(value as T))
    fail(`${name} has an unsupported value.`);
  return value as T;
}
export function safeUrl(value: unknown, name = "Link"): string {
  const result = text(value, name, 2048);
  let url: URL;
  try {
    url = new URL(result);
  } catch {
    return fail(`${name} must be an absolute http or https URL.`);
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    /\s/.test(result) ||
    [...result].some((character) => character.charCodeAt(0) < 32)
  )
    fail(`${name} must be an http or https URL without embedded credentials.`);
  return result;
}
function attachment(value: unknown, name: string): Attachment {
  const v = record(value, name);
  keys(v, ["id", "name", "type", "dataUrl", "size"], name);
  const type = enumeration(
    v.type,
    ["image/png", "image/jpeg", "image/webp"] as const,
    `${name}.type`,
  );
  if (
    typeof v.size !== "number" ||
    !Number.isSafeInteger(v.size) ||
    v.size <= 0 ||
    v.size > MAX_IMAGE_BYTES
  )
    fail(`${name} image must be between 1 byte and 3 MB.`);
  const dataUrl = text(
    v.dataUrl,
    `${name}.dataUrl`,
    Math.ceil(MAX_IMAGE_BYTES / 3) * 4 + 40,
  );
  const prefix = `data:${type};base64,`;
  const payload = dataUrl.slice(prefix.length);
  if (
    !dataUrl.startsWith(prefix) ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      payload,
    )
  )
    fail(`${name} has invalid image data.`);
  const decodedSize =
    (payload.length / 4) * 3 -
    (payload.endsWith("==") ? 2 : payload.endsWith("=") ? 1 : 0);
  if (decodedSize !== v.size)
    fail(`${name} image size does not match its data.`);
  const start = atob(payload.slice(0, 32));
  const validHeader =
    type === "image/png"
      ? start.startsWith("\x89PNG\r\n\x1a\n")
      : type === "image/jpeg"
        ? start.startsWith("\xff\xd8\xff")
        : start.startsWith("RIFF") && start.slice(8, 12) === "WEBP";
  if (!validHeader)
    fail(`${name} image content does not match its declared format.`);
  return {
    id: id(v.id, `${name}.id`),
    name: text(v.name, `${name}.name`, 200),
    type,
    dataUrl,
    size: v.size,
  };
}
function prior(value: unknown, name: string): PriorEvidence {
  const v = record(value, name);
  keys(v, ["id", "lessonId", "state", "source", "at"], name);
  return {
    id: id(v.id, `${name}.id`),
    lessonId: id(v.lessonId, `${name}.lessonId`),
    state: enumeration(
      v.state,
      ["Introduced", "Practiced", "Demonstrated"] as const,
      `${name}.state`,
    ),
    source: text(v.source, `${name}.source`, 2000),
    at: time(v.at, `${name}.at`),
  };
}
function attempt(value: unknown, name: string): ExerciseAttempt {
  const v = record(value, name);
  keys(
    v,
    [
      "id",
      "lessonId",
      "exerciseId",
      "answer",
      "correct",
      "hintUsed",
      "at",
      "context",
    ],
    name,
  );
  return {
    id: id(v.id, `${name}.id`),
    lessonId: id(v.lessonId, `${name}.lessonId`),
    exerciseId: id(v.exerciseId, `${name}.exerciseId`),
    answer: text(v.answer, `${name}.answer`, 10_000),
    correct: bool(v.correct, `${name}.correct`),
    hintUsed: bool(v.hintUsed, `${name}.hintUsed`),
    at: time(v.at, `${name}.at`),
    context: enumeration(
      v.context,
      ["lesson", "review", "calibration", "checkpoint"] as const,
      `${name}.context`,
    ),
  };
}
function submission(value: unknown, name: string): LabSubmission {
  const v = record(value, name);
  keys(
    v,
    [
      "id",
      "lessonId",
      "at",
      "title",
      "output",
      "commands",
      "notes",
      "explanation",
      "code",
      "config",
      "links",
      "screenshots",
      "rubricChecks",
      "independent",
      "hintsUsed",
    ],
    name,
  );
  return {
    id: id(v.id, `${name}.id`),
    lessonId: id(v.lessonId, `${name}.lessonId`),
    at: time(v.at, `${name}.at`),
    title: text(v.title, `${name}.title`, 300),
    output: text(v.output, `${name}.output`),
    commands: text(v.commands, `${name}.commands`),
    notes: text(v.notes, `${name}.notes`),
    explanation: text(v.explanation, `${name}.explanation`),
    code: text(v.code, `${name}.code`),
    config: text(v.config, `${name}.config`),
    links: list(v.links, `${name}.links`, safeUrl, 20),
    screenshots: list(v.screenshots, `${name}.screenshots`, attachment, 6),
    rubricChecks: list(v.rubricChecks, `${name}.rubricChecks`, bool, 30),
    independent: bool(v.independent, `${name}.independent`),
    hintsUsed: bool(v.hintsUsed, `${name}.hintsUsed`),
  };
}
function project(value: unknown, name: string): ProjectSubmission {
  const v = record(value, name);
  keys(
    v,
    [
      "id",
      "url",
      "summary",
      "evidence",
      "rubricChecks",
      "submittedAt",
      "reviewer",
      "reviewNotes",
    ],
    name,
  );
  const projectId = id(v.id, `${name}.id`);
  if (!projectIds.has(projectId))
    fail(`${name} references an unknown portfolio project.`);
  return {
    id: projectId,
    url: v.url === "" ? "" : safeUrl(v.url, `${name}.url`),
    summary: text(v.summary, `${name}.summary`),
    evidence: text(v.evidence, `${name}.evidence`),
    rubricChecks: list(v.rubricChecks, `${name}.rubricChecks`, bool, 30),
    submittedAt: time(v.submittedAt, `${name}.submittedAt`),
    ...(v.reviewer === undefined
      ? {}
      : { reviewer: text(v.reviewer, `${name}.reviewer`, 200) }),
    ...(v.reviewNotes === undefined
      ? {}
      : { reviewNotes: text(v.reviewNotes, `${name}.reviewNotes`) }),
  };
}
function certification(value: unknown, name: string): CertificationScore {
  const v = record(value, name);
  keys(
    v,
    ["id", "certificationId", "score", "at", "source", "kind", "credentialUrl"],
    name,
  );
  if (
    typeof v.score !== "number" ||
    !Number.isFinite(v.score) ||
    v.score < 0 ||
    v.score > 100
  )
    fail(`${name}.score must be a number from 0 to 100.`);
  const kind =
    v.kind === undefined
      ? undefined
      : enumeration(
          v.kind,
          ["practice", "study", "credential"] as const,
          `${name}.kind`,
        );
  const source = text(v.source, `${name}.source`, 2000);
  if (kind === "credential" && (v.score !== 0 || !source.trim()))
    fail(`${name} completion needs a source and a zero score placeholder.`);
  if (kind !== "credential" && v.credentialUrl !== undefined)
    fail(
      `${name} practice and study scores cannot contain credential metadata.`,
    );
  return {
    id: id(v.id, `${name}.id`),
    certificationId: id(v.certificationId, `${name}.certificationId`),
    score: v.score,
    at: time(v.at, `${name}.at`),
    source,
    ...(kind === undefined ? {} : { kind }),
    ...(v.credentialUrl === undefined
      ? {}
      : { credentialUrl: safeUrl(v.credentialUrl, `${name}.credentialUrl`) }),
  };
}
function unique<T extends { id: string }>(items: T[], name: string): T[] {
  const byId = new Map<string, T>();
  for (const item of items) {
    const existing = byId.get(item.id);
    if (existing && JSON.stringify(existing) !== JSON.stringify(item))
      fail(`${name} contains conflicting entries for ${item.id}.`);
    byId.set(item.id, item);
  }
  return [...byId.values()];
}
export function validateData(value: unknown): AtlasData {
  // Structural validation prevents unsafe/corrupt imports, not falsified human evidence.
  // Local backups have no signature or authenticated reviewer. The learning engine filters
  // future events and rechecks current exercise answers before awarding retrieval evidence.
  const v = record(value, "Backup");
  if (v.version !== 1)
    fail(
      "Unsupported backup version. This application reads version 1 only; no data was changed.",
    );
  keys(
    v,
    [
      "version",
      "createdAt",
      "updatedAt",
      "priorHistory",
      "attempts",
      "submissions",
      "projects",
      "certifications",
    ],
    "Backup",
  );
  const result: AtlasData = {
    version: 1,
    createdAt: time(v.createdAt, "createdAt"),
    updatedAt: time(v.updatedAt, "updatedAt"),
    priorHistory: unique(
      list(v.priorHistory, "priorHistory", prior, 1000),
      "priorHistory",
    ),
    attempts: unique(list(v.attempts, "attempts", attempt), "attempts"),
    submissions: unique(
      list(v.submissions, "submissions", submission, 5000),
      "submissions",
    ),
    projects: unique(list(v.projects, "projects", project, 8), "projects"),
    certifications: unique(
      list(v.certifications, "certifications", certification, 10_000),
      "certifications",
    ),
  };
  if (result.createdAt > result.updatedAt)
    fail("Backup creation time cannot be after its update time.");
  if (
    new TextEncoder().encode(JSON.stringify(result)).length > MAX_BACKUP_BYTES
  )
    fail("The backup exceeds the 50 MB safety limit.");
  return result;
}
export function parseBackup(json: string): AtlasData {
  if (
    typeof json !== "string" ||
    json.length > MAX_BACKUP_BYTES ||
    new TextEncoder().encode(json).length > MAX_BACKUP_BYTES
  )
    fail("The backup exceeds the 50 MB safety limit.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return fail(
      "This file is not valid JSON. Your saved progress was not changed.",
    );
  }
  return validateData(parsed);
}
export function exportBackup(data: AtlasData): string {
  return JSON.stringify(validateData(data));
}
function mergeImmutable<T extends { id: string }>(
  current: T[],
  incoming: T[],
  name: string,
): T[] {
  return unique([...current, ...incoming], name);
}
function mergeLatest<T extends { id: string }>(
  current: T[],
  incoming: T[],
  date: (item: T) => string,
  name: string,
): T[] {
  const merged = new Map(current.map((item) => [item.id, item]));
  for (const item of incoming) {
    const old = merged.get(item.id);
    if (!old || date(item) > date(old)) merged.set(item.id, item);
    else if (
      date(item) === date(old) &&
      JSON.stringify(item) !== JSON.stringify(old)
    )
      fail(
        `${name} has conflicting edits with the same timestamp. Keep both original backup files and resolve the conflict before importing.`,
      );
  }
  return [...merged.values()];
}
/** Pure merge is a future sync boundary. Immutable event collisions fail instead of silently replacing evidence. */
export function mergeData(current: AtlasData, incoming: AtlasData): AtlasData {
  const a = validateData(current);
  const b = validateData(incoming);
  const priorById = new Map(a.priorHistory.map((item) => [item.id, item]));
  for (const item of b.priorHistory)
    if (!priorById.has(item.id)) priorById.set(item.id, item);
  return validateData({
    version: 1,
    createdAt: [a.createdAt, b.createdAt].sort()[0],
    updatedAt: [a.updatedAt, b.updatedAt, new Date().toISOString()]
      .sort()
      .at(-1),
    priorHistory: [...priorById.values()],
    attempts: mergeImmutable(a.attempts, b.attempts, "Attempts"),
    submissions: mergeLatest(
      a.submissions,
      b.submissions,
      (item) => item.at,
      "Submissions",
    ),
    projects: mergeLatest(
      a.projects,
      b.projects,
      (item) => item.submittedAt,
      "Projects",
    ),
    certifications: mergeImmutable(
      a.certifications,
      b.certifications,
      "Certification scores",
    ),
  });
}
function friendlyError(error: unknown): StorageError {
  if (error instanceof StorageError) return error;
  const name = error instanceof Error ? error.name : "";
  const message =
    name === "QuotaExceededError"
      ? "Browser storage is full. This change was not saved. Export your progress and free storage before trying again."
      : "Browser storage could not save or load progress. Existing data was not replaced. Check browser storage permissions and try again.";
  return new StorageError(message, { cause: error });
}
function openDatabase(databaseName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(
        new StorageError(
          "IndexedDB is unavailable. Enable browser storage to save progress.",
        ),
      );
      return;
    }
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(databaseName, 1);
    } catch (error) {
      reject(friendlyError(error));
      return;
    }
    let rejected = false;
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("state"))
        request.result.createObjectStore("state");
    };
    request.onerror = () => reject(friendlyError(request.error));
    request.onblocked = () => {
      rejected = true;
      reject(
        new StorageError(
          "Storage is blocked by another open Atlas tab. Close that tab and try again.",
        ),
      );
    };
    request.onsuccess = () => {
      const db = request.result;
      if (rejected) {
        db.close();
        return;
      }
      db.onversionchange = () => db.close();
      resolve(db);
    };
  });
}
/** A single read-modify-write transaction serializes even separate tabs, preventing lost updates. */
export function createStorage(databaseName = DATABASE_NAME) {
  async function transaction(
    update: (data: AtlasData) => AtlasData,
  ): Promise<AtlasData> {
    const db = await openDatabase(databaseName);
    return new Promise((resolve, reject) => {
      let tx: IDBTransaction;
      try {
        tx = db.transaction("state", "readwrite");
      } catch (error) {
        db.close();
        reject(friendlyError(error));
        return;
      }
      let result: AtlasData;
      let failure: unknown;
      tx.oncomplete = () => {
        db.close();
        resolve(result);
      };
      tx.onerror = () => {
        failure ??= tx.error;
      };
      tx.onabort = () => {
        db.close();
        reject(friendlyError(failure ?? tx.error));
      };
      const store = tx.objectStore("state");
      const request = store.get("atlas");
      request.onsuccess = () => {
        try {
          const current =
            request.result === undefined
              ? createInitialData()
              : validateData(request.result);
          result = validateData(update(current));
          store.put(result, "atlas");
        } catch (error) {
          failure = error;
          tx.abort();
        }
      };
    });
  }
  function changed(data: AtlasData): AtlasData {
    return { ...data, updatedAt: new Date().toISOString() };
  }
  return {
    loadData: () => transaction((data) => data),
    appendAttempt: (value: ExerciseAttempt) =>
      transaction((data) =>
        changed({
          ...data,
          attempts: mergeImmutable(
            data.attempts,
            [attempt(value, "Attempt")],
            "Attempts",
          ),
        }),
      ),
    saveSubmission: (value: LabSubmission) =>
      transaction((data) =>
        changed({
          ...data,
          submissions: mergeLatest(
            data.submissions,
            [submission(value, "Submission")],
            (item) => item.at,
            "Submissions",
          ),
        }),
      ),
    saveProject: (value: ProjectSubmission) =>
      transaction((data) =>
        changed({
          ...data,
          projects: mergeLatest(
            data.projects,
            [project(value, "Project")],
            (item) => item.submittedAt,
            "Projects",
          ),
        }),
      ),
    saveCertificationScore: (value: CertificationScore) =>
      transaction((data) =>
        changed({
          ...data,
          certifications: mergeImmutable(
            data.certifications,
            [certification(value, "Certification score")],
            "Certification scores",
          ),
        }),
      ),
    importBackup: (json: string) => {
      const incoming = parseBackup(json);
      return transaction((data) => mergeData(data, incoming));
    },
  };
}
const browserStorage = createStorage();
export const {
  loadData,
  appendAttempt,
  saveSubmission,
  saveProject,
  saveCertificationScore,
  importBackup,
} = browserStorage;
export async function fileToAttachment(file: File): Promise<Attachment> {
  if (
    !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
    file.size === 0 ||
    file.size > MAX_IMAGE_BYTES
  )
    fail("Choose a PNG, JPEG, or WebP image smaller than 3 MB.");
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new StorageError("The image could not be read."));
    reader.onerror = () =>
      reject(new StorageError("The image could not be read."));
    reader.onabort = () =>
      reject(new StorageError("Image selection was cancelled."));
    reader.readAsDataURL(file);
  });
  return attachment(
    { id: newId(), name: file.name, type: file.type, dataUrl, size: file.size },
    "Screenshot",
  );
}
