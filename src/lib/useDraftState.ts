import { useCallback, useEffect, useRef, useState } from "react";
import { deleteDraft, loadDraft, saveDraft } from "./drafts";
const memory = new Map<string, unknown>();
const queues = new Map<string, Promise<void>>();
const pending = new Set<string>();
let guarding = false;
function guard() {
  if (guarding) return;
  guarding = true;
  window.addEventListener("beforeunload", (event) => {
    if (pending.size) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
}
/** Drafts survive route changes; they never advance assessed progress or enter evidence exports. */
export function useDraftState<T extends object>(key: string, initial: () => T) {
  const initialValue = useRef<T | undefined>(undefined);
  if (!initialValue.current) initialValue.current = initial();
  const [value, setValue] = useState<T>(
    () => (memory.get(key) as T | undefined) ?? initialValue.current!,
  );
  const [ready, setReady] = useState(memory.has(key));
  const [hasDraft, setHasDraft] = useState(memory.has(key));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const current = useRef(value);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    guard();
    let live = true;
    if (memory.has(key)) {
      setReady(true);
      return () => {
        mounted.current = false;
      };
    }
    (queues.get(key) ?? Promise.resolve())
      .catch(() => {})
      .then(() => loadDraft<T>(key))
      .then((saved) => {
        if (!live) return;
        if (saved !== undefined) {
          if (
            !saved ||
            typeof saved !== "object" ||
            Object.keys(initialValue.current!).some((k) => !(k in saved))
          )
            throw new Error(
              "An unfinished draft has an incompatible format. Saved evidence is unaffected.",
            );
          memory.set(key, saved);
          current.current = saved;
          setValue(saved);
          setHasDraft(true);
        }
      })
      .catch((e: Error) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setReady(true);
      });
    return () => {
      live = false;
      mounted.current = false;
    };
  }, [key]);
  const update = useCallback(
    (change: T | ((previous: T) => T)) => {
      const next =
        typeof change === "function" ? change(current.current) : change;
      current.current = next;
      memory.set(key, next);
      setValue(next);
      setHasDraft(true);
      setError("");
      setSaving(true);
      pending.add(key);
      const operation = (queues.get(key) ?? Promise.resolve())
        .catch(() => {})
        .then(() => saveDraft(key, next));
      queues.set(key, operation);
      operation
        .then(() => {
          if (queues.get(key) === operation) {
            pending.delete(key);
            if (mounted.current) {
              setError("");
              setSaving(false);
            }
          }
        })
        .catch((e: Error) => {
          if (mounted.current) {
            setError(e.message);
            setSaving(false);
          }
        });
    },
    [key],
  );
  const discard = useCallback(async () => {
    await (queues.get(key) ?? Promise.resolve()).catch(() => {});
    await deleteDraft(key);
    memory.delete(key);
    pending.delete(key);
    if (mounted.current) {
      setHasDraft(false);
      setError("");
      setSaving(false);
    }
  }, [key]);
  return { value, update, ready, hasDraft, error, saving, discard };
}
