# Things to do

# UX Improvement: Loading screen blink for word cards

--> Can change the behavior such that the loading screen skeleton animation wont show until after 200ms (or 100ms? which is a better threshold?) so prevent the "flash blinking" for people with fast internet speeds? Do you get what I mean?

# Badge Popover Content Presentation Improvement

- Make the popover of the badges look like the css of the description of the frequency table and use it dataset-catalog.ts as source

# Feature: Mark word status functionality

- On the top right of the word card (on the left or both the tier icon and the number "#1,xxxx" ), add like a pill type badge which is the word status, which when you can click, you can mark as "Known", "Familiar", or "Default" (is "Default" good word status or should there be something else? examples: Default / Not Marked / No Status) Pill should be (Known Status: SOLID GREEN BACKGROUND, Familiar Status: BLACK OR WHITE SOLID BACKGROUND (Depending on whether light or dark mode, and "Default": Very muted border and text, transparent background)). Please make it look nice and use your best judgement interms of css styles, and ui/ux. Store this information on the local storage. Update privacy.astro accordingly.

- Known - You know this pretty well
- Familiar - You have encountered this word but have not yet committed to long term memory
- Default - You did not set the status of this card

# FIX Bug on Headphone icon not speaking

- Problem with speak functionality Fix bug, speaking not working on mobile phones. The react hook below might help debug for reference.

```
import { useCallback, useEffect, useRef } from "react";

export const useSpeak = (word: string) => {
const japaneseVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

useEffect(() => {
const loadVoices = () => {
const voices = window.speechSynthesis.getVoices();
japaneseVoiceRef.current =
voices.find((voice) => voice.lang === "ja-JP") || null;
};

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };

}, []);

const speak = useCallback(() => {
// Cancel any ongoing speech (Chrome fix)
window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";

    if (!japaneseVoiceRef.current) {
      const voices = window.speechSynthesis.getVoices();
      japaneseVoiceRef.current =
        voices.find((voice) => voice.lang === "ja-JP") || null;
    }

    if (japaneseVoiceRef.current) {
      utterance.voice = japaneseVoiceRef.current;
    }

    window.speechSynthesis.speak(utterance);

}, [word]);

return speak;
};
```

## Improve how the icon buttons looks (as well as the hover animation?) ?
