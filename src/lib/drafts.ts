/** Unsubmitted work lives separately from the assessed learning record. */
export const DRAFT_DATABASE_NAME = "atlas-school-drafts";
const STORE_NAME = "drafts";
const DATABASE_VERSION = 1;

type StoredDraft = { version: 1; value: unknown; savedAt: number };

export class DraftStorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "DraftStorageError";
  }
}

function checkKey(key: string): void {
  if (typeof key !== "string" || !key.trim() || key.length > 512) {
    throw new DraftStorageError(
      "The draft needs a nonempty identifier of at most 512 characters.",
    );
  }
}

function friendlyError(
  error: unknown,
  action: "load" | "save" | "delete",
): DraftStorageError {
  if (error instanceof DraftStorageError) return error;
  const name =
    error && typeof error === "object" && "name" in error
      ? String(error.name)
      : "";
  if (name === "QuotaExceededError") {
    return new DraftStorageError(
      "Browser storage is full. The draft was not saved. Keep this editor open and copy your unfinished work before freeing storage.",
      { cause: error },
    );
  }
  if (name === "DataCloneError") {
    return new DraftStorageError(
      "This draft contains a value the browser cannot store. Your previous saved draft has not been replaced.",
      { cause: error },
    );
  }
  const message =
    action === "load"
      ? "The browser could not load your unfinished draft. Saved learning evidence has not been changed. Check browser storage permissions and try again."
      : action === "delete"
        ? "The browser could not remove the unfinished draft. It may reappear next time; saved learning evidence has not been changed."
        : "The browser could not save your unfinished draft. Keep this editor open and copy your work before leaving. Saved learning evidence has not been changed.";
  return new DraftStorageError(message, { cause: error });
}

function openDatabase(
  action: "load" | "save" | "delete",
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(
        new DraftStorageError(
          "IndexedDB is unavailable, so unfinished drafts cannot be saved or restored. Keep this editor open and copy your work before leaving.",
        ),
      );
      return;
    }
    let request: IDBOpenDBRequest;
    try {
      request = globalThis.indexedDB.open(
        DRAFT_DATABASE_NAME,
        DATABASE_VERSION,
      );
    } catch (error) {
      reject(friendlyError(error, action));
      return;
    }
    let rejected = false;
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME))
        db.createObjectStore(STORE_NAME);
    };
    request.onerror = () => reject(friendlyError(request.error, action));
    request.onblocked = () => {
      rejected = true;
      reject(
        new DraftStorageError(
          "Draft storage is blocked by another open Atlas tab. Close that tab and try again; keep a copy of unfinished work.",
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

async function transaction<T>(
  key: string,
  action: "load" | "save" | "delete",
  operation: (store: IDBObjectStore) => IDBRequest,
  read: (value: unknown) => T,
): Promise<T> {
  checkKey(key);
  const db = await openDatabase(action);
  return new Promise((resolve, reject) => {
    let tx: IDBTransaction;
    try {
      tx = db.transaction(
        STORE_NAME,
        action === "load" ? "readonly" : "readwrite",
      );
    } catch (error) {
      db.close();
      reject(friendlyError(error, action));
      return;
    }
    let result: T;
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
      reject(friendlyError(failure ?? tx.error, action));
    };
    try {
      const request = operation(tx.objectStore(STORE_NAME));
      request.onerror = () => {
        failure ??= request.error;
      };
      request.onsuccess = () => {
        try {
          result = read(request.result);
        } catch (error) {
          failure = error;
          tx.abort();
        }
      };
    } catch (error) {
      failure = error;
      try {
        tx.abort();
      } catch {
        db.close();
        reject(friendlyError(error, action));
      }
    }
  });
}

/** Returns undefined for an absent key. The caller validates its own draft form shape. */
export async function loadDraft<T>(key: string): Promise<T | undefined> {
  return transaction(
    key,
    "load",
    (store) => store.get(key),
    (stored: unknown) => {
      if (stored === undefined) return undefined;
      if (
        !stored ||
        typeof stored !== "object" ||
        !("version" in stored) ||
        stored.version !== 1 ||
        !("value" in stored)
      ) {
        throw new DraftStorageError(
          "This unfinished draft uses an unsupported or damaged format. It has not been removed; saved learning evidence is unaffected.",
        );
      }
      return stored.value as T;
    },
  );
}

/** Resolves only after the write commits. This never submits or assesses the draft. */
export async function saveDraft(key: string, value: unknown): Promise<void> {
  if (value === undefined)
    throw new DraftStorageError(
      "Cannot save an undefined draft. Use deleteDraft to remove one intentionally.",
    );
  const stored: StoredDraft = { version: 1, value, savedAt: Date.now() };
  return transaction(
    key,
    "save",
    (store) => store.put(stored, key),
    () => undefined,
  );
}

/** Deleting an absent key is safe. No learning-evidence records are touched. */
export async function deleteDraft(key: string): Promise<void> {
  return transaction(
    key,
    "delete",
    (store) => store.delete(key),
    () => undefined,
  );
}
