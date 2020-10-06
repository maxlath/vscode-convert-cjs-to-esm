# vscode-convert-cjs-to-esm

A VSCode/[VSCodium](https://vscodium.com) extension to convert CommonJS `require` to a ESM static `import`:

To easily go from:
```js
const suggestionsPerProperties = {
  'wdt:P50': require('./suggestions/wdt_P50'),
  'wdt:P123': require('./suggestions/wdt_P123'),
  'wdt:P629': require('./suggestions/wdt_P629')
}
```
to:
```js
import wdtP50 from './suggestions/wdt_P50'
import wdtP123 from './suggestions/wdt_P123'
import wdtP629 from './suggestions/wdt_P629'

const suggestionsPerProperties = {
  'wdt:P50': wdtP50,
  'wdt:P123': wdtP123,
  'wdt:P629': wdtP629,
}
```

one line at a time, by placing the curor on the line to be converted, and executing the command via a keybinding (see below)

## Install
```
cd ~/.vscode/extensions
git clone https://github.com/maxlath/vscode-convert-cjs-to-esm
```

This command can then be bound to a shortkey, by adding the shortkey to `keybindings.json` (in my set up, can be found at in `~/.config/VSCodium/User`):
```json
{
    "key": "ctrl+alt+i",
    "command": "convert-cjs-to-esm.convert-camel"
},
{
    "key": "ctrl+shift+alt+i",
    "command": "convert-cjs-to-esm.convert-pascal"
}
```
