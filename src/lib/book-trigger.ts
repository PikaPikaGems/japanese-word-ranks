export function initBookTriggerHandler() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    // Let dictionary links inside the popover navigate, but stop card click
    if (target.closest("[data-book-popover]")) {
      e.stopPropagation();
      return;
    }

    const bookTrigger = target.closest("[data-book-trigger]") as HTMLElement | null;

    // Close all other book popovers
    document.querySelectorAll("[data-book-popover]").forEach((el) => {
      if (bookTrigger && el === bookTrigger.parentElement?.querySelector("[data-book-popover]")) return;
      el.classList.add("hidden");
      el.parentElement?.querySelector("[data-book-trigger]")?.setAttribute("aria-expanded", "false");
    });

    if (!bookTrigger) return;

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
  });
}
