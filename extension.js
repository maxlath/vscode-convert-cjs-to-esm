const { commands } = require('vscode')
const convert = require('./convert')

module.exports =  {
  activate: () => {
    commands.registerTextEditorCommand('convert-cjs-to-esm.convert-camel', convert.convertCamelCase)
    commands.registerTextEditorCommand('convert-cjs-to-esm.convert-pascal', convert.convertPascalCase)
  }
}
