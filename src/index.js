import './frame-messager';
import './mute-checker';

function playSound(url) {
  let audio = new Audio(url);
  audio.volume = 1;
  audio.play();
}

function getSecondsRemaining(title) {
  try {
    const [minutes, seconds] = title.split(' ')[0].split(':');
    return Number(seconds) + (Number(minutes) || 0) * 60 || 0;
  } catch (e) {
    return 0;
  }
}

function handleTimeChange(title) {
  const url = window.location.href;

  if (
    !url.includes('/session') &&
    !url.includes('/dashboard') &&
    !url.includes('csb.app') &&
    !url.includes('localhost')
  ) {
    return;
  }

  // Don't play start sound if you've already joined the session
  if (url.includes('/session')) return;

  // Only play sound for starting. Not ending, not finished
  if (!title.includes('until start')) return;

  const secondsLeft = getSecondsRemaining(title);
  chrome.storage.sync.get(null, (result) => {
    const { playAtSecond, sound } = result;

    // Play at x seconds before start
    if (parseInt(playAtSecond) === secondsLeft) {
      playSound(sound);
      return;
    }
  });
}

window.addEventListener('load', () => {
  const target = document.querySelector('title');
  if (target) {
    const observer = new MutationObserver(function (mutations) {
      handleTimeChange(mutations[0].target.innerText);
    });

    const config = { subtree: true, characterData: true, childList: true };
    observer.observe(target, config);
  }
});
