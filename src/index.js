import "./frame-messager";
import "./mute-checker";

function playSound(url) {
  let audio = new Audio(url);
  audio.volume = 1;
  audio.play();
}

function getSecondsRemaining(title) {
  try {
    const [minutes, seconds] = title.split(" ")[0].split(":");
    return Number(seconds) + (Number(minutes) || 0) * 60 || 0;
  } catch (e) {
    return 0;
  }
}

function handleTimeChange(title) {
  const url = window.location.href;

  if (
    !url.includes("/session") &&
    !url.includes("/dashboard") &&
    !url.includes("csb.app") &&
    !url.includes("localhost")
  ) {
    return;
  }

  const secondsLeft = getSecondsRemaining(title);

  chrome.storage.sync.get(null, (result) => {
    const { playAtSecond, sound } = result;

    // Play at end?
    if (title.includes("Finished!")) {
      playSound(sound);
      return;
    }

    // Play at x seconds
    if (parseInt(playAtSecond) === secondsLeft) {
      playSound(sound);
      return;
    }
  });
}

window.addEventListener("load", () => {
  const target = document.querySelector("title");
  if (target) {
    const observer = new MutationObserver(function (mutations) {
      handleTimeChange(mutations[0].target.innerText);
    });

    const config = { subtree: true, characterData: true, childList: true };
    observer.observe(target, config);
  }
});