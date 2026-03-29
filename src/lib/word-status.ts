export type WordStatus = "none" | "known" | "familiar";

export const STATUS_CYCLE: WordStatus[] = ["none", "known", "familiar"];

export const STATUS_LABEL: Record<WordStatus, string> = {
  none: "No Status",
  known: "Known",
  familiar: "Familiar",
};

const STATUS_CLASSES: Record<WordStatus, string[]> = {
  none:     ["bg-transparent", "text-muted-foreground", "border-border"],
  known:    ["bg-green-500",   "text-white",            "border-transparent"],
  familiar: ["bg-foreground",  "text-background",       "border-transparent"],
};

function storageKey(word: string): string {
  return `word-status:${word}`;
}

export function getWordStatus(word: string): WordStatus {
  return (localStorage.getItem(storageKey(word)) as WordStatus) || "none";
}

export function setWordStatus(word: string, status: WordStatus): void {
  if (status === "none") localStorage.removeItem(storageKey(word));
  else localStorage.setItem(storageKey(word), status);
}

export function applyStatusStyle(btn: HTMLElement, status: WordStatus): void {
  const label = btn.querySelector<HTMLElement>("[data-status-label]");
  if (label) label.textContent = STATUS_LABEL[status];
  for (const classes of Object.values(STATUS_CLASSES)) btn.classList.remove(...classes);
  btn.classList.add(...STATUS_CLASSES[status]);
}

export function initWordStatusHandler() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const statusBtn = target.closest("[data-status-btn]") as HTMLElement | null;
    if (!statusBtn) return;

    e.preventDefault();
    e.stopPropagation();
    const word = statusBtn.dataset.word;
    if (word) {
      const current = getWordStatus(word);
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
      setWordStatus(word, next);
      applyStatusStyle(statusBtn, next);
      document.dispatchEvent(new CustomEvent("word-status-change"));
    }
  });
}
