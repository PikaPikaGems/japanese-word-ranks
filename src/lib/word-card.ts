import { getTier, type Tier } from "./tier";
import { TIER_STYLE } from "./badges";
import { SORT_ORDER_MAP } from "./sort-orders";
import { DICTIONARY_LINKS } from "./external-links";

function base(): string {
  return (window as Window & { __BASE__?: string }).__BASE__ || "";
}

export interface WordCardData {
  word: string;
  reading: string;
  jlpt?: number;
  kaishi?: boolean;
  ranks?: Record<string, number>;
  tier?: string;
}

export interface WordCardOptions {
  linked?: boolean;
  listRank?: number;
}

export function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildBadges(data: WordCardData): { label: string; value: string | number; tier: Tier; description: string }[] {
  const badges: { label: string; value: string | number; tier: Tier; description: string }[] = [];
  const { jlpt, kaishi, ranks = {} } = data;

  if (jlpt) {
    const tier: Tier = jlpt >= 4 ? "BASIC" : jlpt === 3 ? "COMMON" : jlpt === 2 ? "FLUENT" : "ADVANCED";
    badges.push({ label: "JLPT", value: `N${jlpt}`, tier, description: `Japanese Language Proficiency Test Level N${jlpt}` });
  }
  if (kaishi) {
    badges.push({ label: "Kaishi", value: "✓", tier: "BASIC", description: "Kaishi 1500 beginner vocabulary deck." });
  }
  for (const [key, rank] of Object.entries(ranks)) {
    if (rank === -1) continue;
    const so = SORT_ORDER_MAP.get(key);
    if (so) badges.push({ label: so.label, value: rank, tier: getTier(rank), description: so.description });
  }
  return badges;
}

export function renderBadge(label: string, value: string | number, tier: Tier, description: string): string {
  const style = TIER_STYLE[tier] || TIER_STYLE.UNRANKED;
  const displayValue = value === -1 || value === "-1" ? "—" : typeof value === "number" ? value.toLocaleString() : value;
  const id = `pop-${label.replace(/\s+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`;
  return `
    <span class="relative inline-block">
      <button class="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${style.badge}" aria-expanded="false" aria-controls="${id}" data-badge-trigger>
        <span class="text-sm">${style.emoji}</span>
        <span>${esc(label)}</span>
        <span class="font-extrabold">${esc(String(displayValue))}</span>
      </button>
      <div id="${id}" class="badge-popover hidden absolute z-50 top-full mt-2 w-72 rounded-xl border border-border bg-popover p-5 text-popover-foreground shadow-md" data-badge-popover>
        <div class="popover-arrow absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-border bg-popover"></div>
        <p class="text-sm font-bold mb-1">${esc(label)}</p>
        <p class="text-xs text-muted-foreground leading-relaxed">${esc(description)}</p>
      </div>
    </span>
  `;
}

export function fillWordCard(card: HTMLElement, data: WordCardData, options: WordCardOptions = {}) {
  const { linked = false, listRank } = options;
  const wordUrl = `${base()}/word/?w=${encodeURIComponent(data.word)}`;

  const rankLabel = card.querySelector<HTMLElement>("[data-rank-label]");
  if (rankLabel) rankLabel.textContent = listRank != null ? `#${listRank.toLocaleString()}` : "";

  const tierEmoji = card.querySelector<HTMLElement>("[data-tier-emoji]");
  if (tierEmoji) tierEmoji.textContent = data.tier ? (TIER_STYLE[data.tier as Tier]?.emoji ?? "") : "";

  if (linked) {
    card.dataset.wordCard = "";
    card.dataset.wordUrl = wordUrl;
    card.style.cursor = "pointer";
    card.classList.add("hover:border-primary/40", "hover:shadow-md", "transition-all");
  }

  card.querySelector<HTMLElement>("[data-word-display]")!.textContent = data.word;
  card.querySelector<HTMLElement>("[data-word-reading]")!.textContent =
    data.reading !== data.word ? data.reading : "";

  card.querySelector<HTMLElement>(".tts-btn")!.dataset.word = data.word;
  card.querySelector<HTMLElement>(".copy-url-btn")!.dataset.copyUrl = wordUrl;

  for (const link of card.querySelectorAll<HTMLAnchorElement>("[data-dict-name]")) {
    const entry = DICTIONARY_LINKS.find(d => d.name === link.dataset.dictName);
    if (entry) link.href = entry.url(data.word);
  }

  card.querySelector<HTMLElement>("[data-badges]")!.innerHTML =
    buildBadges(data).map(b => renderBadge(b.label, b.value, b.tier, b.description)).join("");
}

/**
 * Attach shared word card event handlers (TTS, book popover, copy URL, badge popover, card navigation).
 * Call once per page. Uses event delegation on document.
 */
export function initWordCardHandlers() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Copy URL
    const copyBtn = target.closest(".copy-url-btn") as HTMLElement | null;
    if (copyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const path = copyBtn.dataset.copyUrl;
      if (path) {
        const fullUrl = window.location.origin + path;
        navigator.clipboard.writeText(fullUrl).then(() => {
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
          setTimeout(() => { copyBtn.innerHTML = original; }, 1500);
        });
      }
      return;
    }

    // TTS
    const ttsBtn = target.closest(".tts-btn") as HTMLElement | null;
    if (ttsBtn) {
      e.preventDefault();
      e.stopPropagation();
      const word = ttsBtn.dataset.word;
      if (word && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "ja-JP";
        speechSynthesis.speak(utterance);
      }
      return;
    }

    // Book popover
    const bookTrigger = target.closest("[data-book-trigger]") as HTMLElement | null;
    document.querySelectorAll("[data-book-popover]").forEach((el) => {
      if (bookTrigger && el === bookTrigger.parentElement?.querySelector("[data-book-popover]")) return;
      el.classList.add("hidden");
      el.parentElement?.querySelector("[data-book-trigger]")?.setAttribute("aria-expanded", "false");
    });
    if (bookTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const popover = bookTrigger.parentElement?.querySelector("[data-book-popover]") as HTMLElement | null;
      if (popover) {
        const isHidden = popover.classList.toggle("hidden");
        bookTrigger.setAttribute("aria-expanded", String(!isHidden));
        document.querySelectorAll<HTMLElement>(".word-card").forEach(c => c.style.zIndex = "");
        if (!isHidden) {
          const parentCard = popover.closest<HTMLElement>(".word-card");
          if (parentCard) parentCard.style.zIndex = "10";
        }
      }
      return;
    }

    // Dictionary links inside book popover — let them navigate, but stop card click
    if (target.closest("[data-book-popover]")) {
      e.stopPropagation();
      return;
    }

    // Badge popover
    const badgeTrigger = target.closest("[data-badge-trigger]") as HTMLElement | null;
    document.querySelectorAll("[data-badge-popover]").forEach((el) => {
      if (badgeTrigger && el.id === badgeTrigger.getAttribute("aria-controls")) return;
      el.classList.add("hidden");
      const btn = document.querySelector(`[aria-controls="${el.id}"]`);
      btn?.setAttribute("aria-expanded", "false");
    });
    if (badgeTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const id = badgeTrigger.getAttribute("aria-controls");
      const popover = id ? document.getElementById(id) : null;
      if (popover) {
        const isHidden = popover.classList.toggle("hidden");
        badgeTrigger.setAttribute("aria-expanded", String(!isHidden));
        document.querySelectorAll<HTMLElement>(".word-card").forEach(c => c.style.zIndex = "");
        if (!isHidden) {
          const parentCard = popover.closest<HTMLElement>(".word-card");
          if (parentCard) parentCard.style.zIndex = "10";
          const arrow = popover.querySelector<HTMLElement>(".popover-arrow");
          popover.style.left = "0";
          popover.style.right = "auto";
          if (arrow) { arrow.style.left = "1rem"; arrow.style.right = "auto"; }
          const rect = popover.getBoundingClientRect();
          if (rect.right > window.innerWidth - 8) {
            popover.style.left = "auto";
            popover.style.right = "0";
            if (arrow) { arrow.style.left = "auto"; arrow.style.right = "1rem"; }
          }
        }
      }
      return;
    }

    // Card navigation (linked cards only)
    const card = target.closest("[data-word-card]") as HTMLElement | null;
    if (card) {
      const url = card.dataset.wordUrl;
      if (url) window.location.href = url;
    }
  });
}
