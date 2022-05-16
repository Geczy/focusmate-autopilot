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

// Some defaults if they haven't opened the popup yet
// Chrome onInstalled event listener is not reliable so have to set it here
export const defaultSettings = {
  playAtStart: true,
  playInSession: true,
  playAtEnd: true,
  autoMute: true,
  autoPNP: true,
  playAtSecond: 20,
  sound: 'https://mgates.me/mp3/320654_5260872-lq.mp3'
};

// Little helper to get defaults for a setting
export const convertDefaults = (settings) => {
  const convertedValues = {};
  Object.keys(settings).forEach((key) => {
    const value = settings[key];
    // Chrome storage will return undefined if the user hasn't touched the setting yet
    if (value === undefined) convertedValues[key] = defaultSettings[key];
    else convertedValues[key] = value;
  });

  return convertedValues;
};

// Called any time the page title changes (it counts down to / from a session every second)
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

  const secondsLeft = getSecondsRemaining(title);
  chrome.storage.sync.get(Object.keys(defaultSettings), (result) => {
    const { playInSession, playAtStart, playAtEnd, playAtSecond, sound } = convertDefaults({
      ...defaultSettings,
      ...result
    });

    // Don't play start sound if you've already joined the session
    if (!playInSession && url.includes('/session') && title.includes('until start')) return;

    if (!playAtStart && title.includes('until start')) return;
    if (!playAtEnd && title.includes('until end')) return;

    // Play at x seconds before start or end
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
