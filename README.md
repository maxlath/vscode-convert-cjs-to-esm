# vscode-convert-cjs-to-esm

A VSCode/[VSCodium](https://vscodium.com) extension to convert CommonJS `require` to a ESM static `import`

## Install
```
cd ~/.vscode/extensions
git clone https://github.com/maxlath/vscode-convert-cjs-to-esm
```

This command can then be bound to a shortkey, by adding the shortkey to `keybindings.json` (in my set up, can be found at in `~/.config/VSCodium/User`):
```json
{
    "key": "ctrl+shift+alt+i",
    "command": "convert-cjs-to-esm.convert-current-line"
}
```
