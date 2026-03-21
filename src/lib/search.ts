/**
 * Search typeahead logic — shared between / and /word pages.
 * Call initSearch() after DOM is ready.
 */

import {
  romajiToHiragana,
  hasLatin,
  isHiragana,
  isKatakana,
  katakanaToHiragana,
} from "./romaji";

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function initSearch() {
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
  const searchDropdown = document.getElementById("search-dropdown");
  const randomBtn = document.getElementById("random-btn");

  if (!searchInput || !searchDropdown) return;

  const cache = new Map<string, [string, string][]>();
  let highlight = -1;
  let results: [string, string][] = [];
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // ─── Fetch helpers ────────────────────────────────────────────────────

  async function fetchIndex(
    type: "reading" | "word",
    key: string,
  ): Promise<[string, string][]> {
    const ck = `${type}:${key}`;
    const cached = cache.get(ck);
    if (cached) return cached;
    try {
      const res = await fetch(
        `/api/search/${type}/${encodeURIComponent(key)}.json`,
      );
      if (!res.ok) return [];
      const data: [string, string][] = await res.json();
      cache.set(ck, data);
      return data;
    } catch {
      return [];
    }
  }

  // ─── Search ───────────────────────────────────────────────────────────

  async function doSearch(query: string) {
    if (!query.trim()) {
      close();
      return;
    }

    let entries: [string, string][] = [];

    if (hasLatin(query)) {
      const hira = romajiToHiragana(query);
      if (!hira) { close(); return; }
      entries = await fetchIndex("reading", hira.charAt(0));
      results = entries.filter(([, r]) => r.startsWith(hira));
    } else {
      const first = query.charAt(0);
      if (isKatakana(first)) {
        const hira = katakanaToHiragana(query);
        const [wEntries, rEntries] = await Promise.all([
          fetchIndex("word", first),
          fetchIndex("reading", hira.charAt(0)),
        ]);
        const wMatches = wEntries.filter(([w]) => w.startsWith(query));
        const rMatches = rEntries.filter(([, r]) => r.startsWith(hira));
        const seen = new Set<string>();
        results = [];
        for (const e of [...wMatches, ...rMatches]) {
          const k = e[0] + "|" + e[1];
          if (!seen.has(k)) { seen.add(k); results.push(e); }
        }
      } else if (isHiragana(first)) {
        entries = await fetchIndex("reading", first);
        results = entries.filter(([, r]) => r.startsWith(query));
      } else {
        entries = await fetchIndex("word", first);
        results = entries.filter(([w]) => w.startsWith(query));
      }
    }

    results = results.slice(0, 12);
    highlight = -1;
    render();
  }

  // ─── Render / close ───────────────────────────────────────────────────

  function render() {
    if (results.length === 0) {
      searchDropdown.innerHTML = `<div class="px-4 py-3 text-sm text-muted-foreground">No results found</div>`;
      searchDropdown.classList.remove("hidden");
      return;
    }

    searchDropdown.innerHTML = results
      .map(([word, reading], i) => {
        const showReading = reading && reading !== word;
        const active = i === highlight ? "bg-accent text-accent-foreground" : "";
        return `
          <div class="search-item flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors ${active}" data-search-index="${i}">
            <span class="text-base font-semibold" style="font-family: var(--font-japanese);">${escHtml(word)}</span>
            ${showReading ? `<span class="text-sm text-muted-foreground" style="font-family: var(--font-japanese);">${escHtml(reading)}</span>` : ""}
          </div>
        `;
      })
      .join("");

    searchDropdown.classList.remove("hidden");
  }

  function close() {
    searchDropdown.classList.add("hidden");
    results = [];
    highlight = -1;
  }

  function navigateToWord(word: string) {
    window.location.href = `/word/?w=${encodeURIComponent(word)}`;
  }

  // ─── Events ───────────────────────────────────────────────────────────

  searchInput.addEventListener("input", () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => doSearch(searchInput.value), 150);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (results.length === 0 || searchDropdown.classList.contains("hidden")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlight = Math.min(highlight + 1, results.length - 1);
      render();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlight = Math.max(highlight - 1, 0);
      render();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const idx = highlight >= 0 ? highlight : 0;
      if (results[idx]) navigateToWord(results[idx][0]);
    } else if (e.key === "Escape") {
      close();
      searchInput.blur();
    }
  });

  searchDropdown.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest(".search-item") as HTMLElement | null;
    if (item) {
      const idx = parseInt(item.dataset.searchIndex || "0", 10);
      if (results[idx]) navigateToWord(results[idx][0]);
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !(e.target as HTMLElement).closest("#search-input") &&
      !(e.target as HTMLElement).closest("#search-dropdown")
    ) {
      close();
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim() && results.length > 0) {
      searchDropdown.classList.remove("hidden");
    }
  });

  // ─── Random word (dice button) ────────────────────────────────────────

  if (randomBtn) {
    randomBtn.addEventListener("click", async () => {
      try {
        const meta = await (await fetch("/api/sorted/JLPT/meta.json")).json();
        const page = Math.floor(Math.random() * meta.totalPages) + 1;
        const data = await (await fetch(`/api/sorted/JLPT/${page}.json`)).json();
        const items: { word: string }[] = data.items;
        if (items.length > 0) {
          navigateToWord(items[Math.floor(Math.random() * items.length)].word);
        }
      } catch (err) {
        console.error("Random word failed:", err);
      }
    });
  }
}
