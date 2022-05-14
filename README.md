# Focusmate Autopilot

Making your life easier

## Features

* Notify sounds
  * Not in a session, 20s before one starts
  * While in a session, 20s before it ends
  * Set your own custom notification sound to any .mp3 link
* Picture-in-picture
  * Automatically turns on when you mute
  * Turns off when you unmute
* When you mute, will force-mute the other person
  * Does not mute the tab, so finished sound will still play! Only mutes their mic

## Local development

### Popup

1. cd popup
1. yarn
1. yarn build

Every time you make a change you have to run `yarn build` again and reload the extension on `chrome://extensions` to see it in the browser 😂

I like using https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid for that

### Injected script

1. yarn build - so it builds the popup folder
1. yarn start - will watch your injected changes
1. Check `developer mode` in `chrome://extensions`
1. Drag `dist` folder onto `chrome://extensions` page

You don't have to run yarn build when making a change, just reload the extension then reload focusmate.com to see it reflected. Using https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid will reload your focusmate.com page for you if you enable it in options
