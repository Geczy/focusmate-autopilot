import { debounce } from 'lodash';

const unmutedIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="jsx-4060891345 "><g class="jsx-4060891345"><path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z" class="jsx-4060891345"></path><path d="M7.5 12C7.5 11.5858 7.16421 11.25 6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 13.9175 6.62158 15.4436 7.73826 16.4858C8.67527 17.3603 9.90114 17.8386 11.25 17.9654V20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25V17.9654C14.0989 17.8386 15.3247 17.3603 16.2617 16.4858C17.3784 15.4436 18 13.9175 18 12C18 11.5858 17.6642 11.25 17.25 11.25C16.8358 11.25 16.5 11.5858 16.5 12C16.5 13.5825 15.9966 14.6814 15.2383 15.3892C14.4713 16.105 13.3583 16.5 12 16.5C10.6417 16.5 9.52867 16.105 8.76174 15.3892C8.00342 14.6814 7.5 13.5825 7.5 12Z" class="jsx-4060891345"></path></g><path d="M4 20L20 4" stroke="#ffffff" stroke-linecap="round" stroke-width="1.5" style="transform: scale(0) translateZ(0px); transform-origin: 12px 12px;"></path></svg>`;
const mutedIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="jsx-4060891345 "><mask id="micIconMaskTile218064d7-64ff-4c5f-95a4-1384064ee17c" class="jsx-4060891345"><rect x="0" y="0" width="24" height="24" fill="white" class="jsx-4060891345"></rect><path d="M2.88 19L18.88 3" stroke="black" stroke-width="1.5" stroke-linecap="round" style="transform: none; transform-origin: 10.88px 11px;"></path></mask><g class="jsx-4060891345" mask="url(#micIconMaskTile218064d7-64ff-4c5f-95a4-1384064ee17c)"><path d="M12 3C10.3431 3 9 4.34315 9 6V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V6C15 4.34315 13.6569 3 12 3Z" class="jsx-4060891345"></path><path d="M7.5 12C7.5 11.5858 7.16421 11.25 6.75 11.25C6.33579 11.25 6 11.5858 6 12C6 13.9175 6.62158 15.4436 7.73826 16.4858C8.67527 17.3603 9.90114 17.8386 11.25 17.9654V20.25C11.25 20.6642 11.5858 21 12 21C12.4142 21 12.75 20.6642 12.75 20.25V17.9654C14.0989 17.8386 15.3247 17.3603 16.2617 16.4858C17.3784 15.4436 18 13.9175 18 12C18 11.5858 17.6642 11.25 17.25 11.25C16.8358 11.25 16.5 11.5858 16.5 12C16.5 13.5825 15.9966 14.6814 15.2383 15.3892C14.4713 16.105 13.3583 16.5 12 16.5C10.6417 16.5 9.52867 16.105 8.76174 15.3892C8.00342 14.6814 7.5 13.5825 7.5 12Z" class="jsx-4060891345"></path></g><path d="M4 20L20 4" stroke="#ffffff" stroke-linecap="round" stroke-width="1.5" style="transform: none; transform-origin: 12px 12px;"></path></svg>`;

function start() {
  if (!window.location.href.includes('focusmate.com')) {
    return;
  }

  console.log('Running in parent', window.location.href);

  const isMuted = {
    me: false,
    partner: false
  };

  const audioChanged = debounce(function () {
    console.log('Audio changed', isMuted);

    // We unmuted, unmute them too if they wanna talk
    if (!isMuted.me) {
      const frame = document.querySelector('iframe[src*="daily.co"]');
      if (frame) frame.contentWindow.postMessage('EXITPNP', '*');

      console.log('We are unmuted, unmute them too if they wanna talk');
      const partnerAudio = document.querySelector('.audioTracks > audio');
      if (partnerAudio) {
        partnerAudio.muted = false;
        const muteIcon = document.querySelector('.mic.static');
        if (muteIcon) {
          muteIcon.classList.add('muted');
          muteIcon.innerHTML = `<span>you can hear them rn 👀</span> <div style="display:inline-block;">${unmutedIcon}</div>`;
        }
      }
      return;
    }

    if (isMuted.me) {
      const frame = document.querySelector('iframe[src*="daily.co"]');
      if (frame) frame.contentWindow.postMessage('PNP', '*');

      console.log('We muted, so force mute them too');
      const partnerAudio = document.querySelector('.audioTracks > audio');
      if (partnerAudio) {
        partnerAudio.muted = true;
        const muteIcon = document.querySelector('.mic.static');
        if (muteIcon) {
          muteIcon.classList.add('muted');
          muteIcon.innerHTML = `<span>they've been force muted 😂</span> <div style="display:inline-block;">${mutedIcon}</div>`;
        }
      }

      return;
    }
  }, 600);

  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://focusmate.daily.co') return;
    if (e?.data?.action !== 'participant-updated') return;
    const data = e?.data?.participant;

    const isMe = data.local;
    const hasAudio = data.audio;

    isMuted[isMe ? 'me' : 'partner'] = !hasAudio;
    audioChanged();
  });
}

start();
