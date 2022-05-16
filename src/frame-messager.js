// Enable picture-in-picture
export const TURN_ON_PNP = 'turn-on-pnp';

// Disable picture-in-picture
export const TURN_OFF_PNP = 'turn-off-pnp';

// Manually click the mute button
// Currently unused
export const SELF_MUTE = 'self-mute';

function clickElement(selector) {
  const elementToClick = document.querySelector(selector);
  if (elementToClick) elementToClick.click();
}

const selectorToClick = {
  SELF_MUTE: '.robots-btn-mic-mute.visible',

  TURN_ON_PNP: '.robots-btn-speaker-enter-pip',

  TURN_OFF_PNP: '.robots-btn-speaker-leave-pip'
};

function start() {
  // This should only run in the iframe on focusmate
  // The iframe contains video / audio controls
  if (!window.location.href.includes('daily.co')) return;

  window.addEventListener('message', (e) => {
    const selector = selectorToClick[e.data];
    if (selector) clickElement(selector);
  });
}

// We do a function so we can call `return` easily and keep code clean
start();
