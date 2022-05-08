function start() {
  if (!window.location.href.includes('daily.co')) {
    return;
  }

  console.log('Running in frame', window.location.href);

  window.addEventListener('message', (e) => {
    if (e.data === 'MUTE ME') {
      const muteButton = document.querySelector('.btn.robots-btn-mic-mute.visible');
      if (muteButton) {
        muteButton.click();
      }
    }
  });
}

start();
