import { SORT_ORDER_MAP } from "./sort-orders";
import { getTier, type Tier } from "./tier";
import { DICTIONARY_LINKS } from "./external-links";

export const TIER_STYLES: Record<string, { badge: string; emoji: string }> = {
  BASIC:    { badge: "badge-basic bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100", emoji: "🌱" },
  COMMON:   { badge: "badge-common bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100", emoji: "☘️" },
  FLUENT:   { badge: "badge-fluent bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100", emoji: "🌷" },
  ADVANCED: { badge: "badge-advanced bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100", emoji: "📚" },
  UNRANKED: { badge: "badge-unranked bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100", emoji: "🦉" },
};

export interface WordCardData {
  word: string;
  reading: string;
  jlpt?: number;
  kaishi?: boolean;
  ranks?: Record<string, number>;
}

export interface WordCardOptions {
  /** If true, the card is clickable and navigates to the word detail page */
  linked?: boolean;
  /** List rank number to display at top-right (e.g. #1, #1,234) */
  listRank?: number;
}

export function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderBadge(label: string, value: string | number, tier: Tier, description: string): string {
  const style = TIER_STYLES[tier] || TIER_STYLES.UNRANKED;
  const displayValue = value === -1 || value === "-1" ? "—" : value;
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

function buildBadges(data: WordCardData): { label: string; value: string | number; tier: Tier; description: string }[] {
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
    if (so) {
      badges.push({ label: so.label, value: rank, tier: getTier(rank), description: so.description });
    }
  }
  return badges;
}

function renderDictionaryLinks(word: string): string {
  return DICTIONARY_LINKS.map(d =>
    `<a href="${d.url(word)}" target="_blank" rel="noopener noreferrer" class="text-sm text-foreground hover:text-primary transition-colors no-underline hover:underline">${d.name}</a>`
  ).join("");
}

export function renderWordCard(data: WordCardData, options: WordCardOptions = {}): string {
  const { word, reading } = data;
  const { linked = false, listRank } = options;
  const wordUrl = `/word/?w=${encodeURIComponent(word)}`;
  const showReading = reading !== word;

  const badgesHtml = buildBadges(data).map(b => renderBadge(b.label, b.value, b.tier, b.description)).join("");
  const rankLabel = listRank != null ? `#${listRank.toLocaleString()}` : "";

  const linkedAttrs = linked
    ? `data-word-card data-word-url="${esc(wordUrl)}" style="cursor:pointer"`
    : "";
  const hoverClasses = linked
    ? "hover:border-primary/40 hover:shadow-md transition-all"
    : "";

  return `
    <div class="rounded-2xl border border-border bg-card text-card-foreground shadow-sm relative ${hoverClasses}" ${linkedAttrs}>
      ${rankLabel ? `<span class="absolute top-3 right-4 text-xs font-bold text-muted-foreground tabular-nums">${rankLabel}</span>` : ""}
      <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 p-4 sm:p-6">
        <div class="flex flex-row sm:flex-col gap-2.5 shrink-0 order-3 sm:order-1">
          <button class="tts-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer" data-word="${esc(word)}" title="Listen to pronunciation">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
          </button>
          <div class="relative inline-block">
            <button class="book-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer" data-word="${esc(word)}" title="Dictionary links" aria-expanded="false" data-book-trigger>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </button>
            <div class="book-popover hidden absolute z-50 top-full left-0 mt-2 w-56 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-md" data-book-popover>
              <div class="absolute -top-1.5 left-3 h-3 w-3 rotate-45 border-l border-t border-border bg-popover"></div>
              <p class="text-xs font-bold text-muted-foreground mb-2">Look up in:</p>
              <div class="flex flex-col gap-1">
                ${renderDictionaryLinks(word)}
              </div>
            </div>
          </div>
          <button class="copy-url-btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer" data-copy-url="${esc(wordUrl)}" title="Copy link to word">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </button>
        </div>
        <div class="shrink-0 sm:py-4 order-1 sm:order-2">
          <span class="block text-5xl sm:text-7xl font-bold text-foreground sm:px-6 leading-tight" style="font-family: var(--font-japanese);">${esc(word)}</span>
          ${showReading ? `<span class="block text-lg text-muted-foreground mt-1.5 sm:px-6" style="font-family: var(--font-japanese);">${esc(reading)}</span>` : ""}
        </div>
        <div class="flex flex-wrap gap-2 content-start sm:flex-1 min-w-0 sm:py-8 order-2 sm:order-3">
          ${badgesHtml}
        </div>
      </div>
    </div>
  `;
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
        if (!isHidden) {
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
