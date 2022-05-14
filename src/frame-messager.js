function start() {
  if (!window.location.href.includes('daily.co')) {
    return;
  }

  console.log('Running in frame', window.location.href);

  window.addEventListener('message', (e) => {
    if (e.data === 'MUTE ME') {
      const muteButton = document.querySelector('.robots-btn-mic-mute.visible');
      if (muteButton) {
        muteButton.click();
      }
    }

    if (e.data === 'PNP') {
      console.log('Enabling pnp!');
      const partnerVideo = document.querySelector('.robots-btn-speaker-enter-pip');
      if (partnerVideo) partnerVideo.click();
    }

    if (e.data === 'EXITPNP') {
      console.log('Disabling pnp!');
      const partnerVideo = document.querySelector('.robots-btn-speaker-leave-pip');
      if (partnerVideo) partnerVideo.click();
    }
  });
}

start();
