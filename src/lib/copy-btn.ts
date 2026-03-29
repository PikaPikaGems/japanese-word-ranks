export function initCopyBtnHandler() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const copyBtn = target.closest(".copy-url-btn") as HTMLElement | null;
    if (!copyBtn) return;

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
  });
}
