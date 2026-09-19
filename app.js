(() => {
  const display = document.querySelector("#timeDisplay");
  const statusText = document.querySelector("#statusText");
  const presets = [...document.querySelectorAll(".preset")];
  const customForm = document.querySelector("#customForm");
  const customMinutes = document.querySelector("#customMinutes");
  const inputError = document.querySelector("#inputError");
  const startBtn = document.querySelector("#startBtn");
  const pauseBtn = document.querySelector("#pauseBtn");
  const stopBtn = document.querySelector("#stopBtn");
  const resetBtn = document.querySelector("#resetBtn");

  let selectedSeconds = 5 * 60;
  let remainingMs = selectedSeconds * 1000;
  let endAt = 0;
  let intervalId = null;
  let state = "ready"; // ready | running | paused | stopped | finished

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const render = () => {
    display.textContent = formatTime(remainingMs);
    const sessionActive = state === "running" || state === "paused";

    startBtn.disabled = state !== "ready" && state !== "stopped" && state !== "finished";
    pauseBtn.disabled = !sessionActive;
    pauseBtn.textContent = state === "paused" ? "Resume" : "Pause";
    stopBtn.disabled = !sessionActive;

    presets.forEach((button) => { button.disabled = sessionActive; });
    customMinutes.disabled = sessionActive;
    document.querySelector("#setCustom").disabled = sessionActive;
  };

  const setStatus = (message) => { statusText.textContent = message; };

  const markPreset = (minutes) => {
    presets.forEach((button) => {
      const selected = Number(button.dataset.minutes) === minutes;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  const chooseDuration = (seconds, presetMinutes = null) => {
    selectedSeconds = seconds;
    remainingMs = seconds * 1000;
    state = "ready";
    markPreset(presetMinutes);
    inputError.textContent = "";
    setStatus("Ready to practice");
    render();
  };

  const updateRemaining = () => {
    remainingMs = Math.max(0, endAt - Date.now());
    render();

    if (remainingMs <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      remainingMs = 0;
      state = "finished";
      setStatus("Session complete — well done!");
      render();
      playCompletionTone();
    }
  };

  const startTimer = () => {
    if (state !== "ready" && state !== "stopped" && state !== "finished") return;
    if (state === "finished" || remainingMs <= 0) remainingMs = selectedSeconds * 1000;

    endAt = Date.now() + remainingMs;
    state = "running";
    setStatus("Practice in progress");
    render();
    updateRemaining();
    intervalId = window.setInterval(updateRemaining, 200);
  };

  const pauseOrResume = () => {
    if (state === "running") {
      remainingMs = Math.max(0, endAt - Date.now());
      clearInterval(intervalId);
      intervalId = null;
      state = "paused";
      setStatus("Paused");
      render();
      return;
    }

    if (state === "paused") {
      endAt = Date.now() + remainingMs;
      state = "running";
      setStatus("Practice in progress");
      render();
      intervalId = window.setInterval(updateRemaining, 200);
    }
  };

  const stopTimer = () => {
    if (state !== "running" && state !== "paused") return;
    if (state === "running") remainingMs = Math.max(0, endAt - Date.now());
    clearInterval(intervalId);
    intervalId = null;
    state = "stopped";
    setStatus("Stopped — reset when you are ready");
    render();
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
    remainingMs = selectedSeconds * 1000;
    state = "ready";
    setStatus("Ready to practice");
    render();
  };

  const playCompletionTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.6);
      oscillator.addEventListener("ended", () => context.close().catch(() => {}), { once: true });
    } catch {
      // Audio is a best-effort enhancement; timer completion never depends on it.
    }
  };

  presets.forEach((button) => {
    button.addEventListener("click", () => {
      const minutes = Number(button.dataset.minutes);
      chooseDuration(minutes * 60, minutes);
    });
  });

  customForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Number(customMinutes.value);
    if (!Number.isInteger(value) || value < 1 || value > 999) {
      inputError.textContent = "Enter a whole number from 1 to 999.";
      return;
    }
    chooseDuration(value * 60);
    customMinutes.value = "";
  });

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseOrResume);
  stopBtn.addEventListener("click", stopTimer);
  resetBtn.addEventListener("click", resetTimer);

  if (new URLSearchParams(window.location.search).has("test")) {
    window.__practiceTimerTest = {
      setDurationSeconds(seconds) {
        chooseDuration(seconds);
      },
      getState() {
        return { state, selectedSeconds, remainingMs };
      }
    };
  }

  render();
})();
