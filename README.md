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

## Current Features

Coming soon
