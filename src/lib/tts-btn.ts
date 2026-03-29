export function preloadVoices() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      window.speechSynthesis.getVoices();
    });
  }
}

export function initTtsBtnHandler() {
  preloadVoices();

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const ttsBtn = target.closest(".tts-btn") as HTMLElement | null;
    if (!ttsBtn) return;

    e.preventDefault();
    e.stopPropagation();
    const word = ttsBtn.dataset.word;
    if (word && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "ja-JP";
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang === "ja-JP");
      if (jaVoice) utterance.voice = jaVoice;
      window.speechSynthesis.speak(utterance);
    }
  });
}
