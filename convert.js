const vscode = require('vscode')
const camelCase = require('lodash.camelcase')

const pascalCase = text => {
  const camelified = camelCase(text)
  return camelified[0].toUpperCase() + camelified.slice(1)
}

const getIndexOfFirstListBelowImports = lines => {
  lines = lines.slice(0)
  index = 0
  while (lines.length > 0) {
    index++
    const nextLine = lines.shift()
    if (!nextLine.startsWith('import')) return { index, isEmptyLine: nextLine.trim() === '' }
  }
}

const convert = async (textEditor, transformModuleName) => {
  const { line: cursorLineNum } = textEditor._selections[0].active
  const lines = textEditor._documentData._lines
  const requireLine = lines[cursorLineNum]
  console.log('requireLine', requireLine)
  const requireLineLength = requireLine.length
  const requireFilepathMatch = requireLine.match(/: require\(('|")(.*)('|")\),?$/)
  if (requireFilepathMatch == null) {
    console.warn('[vscode.window.activeTextEditor] require line not found', { cursorLineNum, line: requireLine })
    return
  }
  const moduleFilepath = requireFilepathMatch[2]
  const moduleFilename = moduleFilepath.split('/').slice(-1)[0]
  console.log('moduleFilename', moduleFilename)
  console.log('moduleFilepath', moduleFilepath)
  const moduleName = transformModuleName(moduleFilename)
  console.log('moduleName', moduleName)

  const requireStart = new vscode.Position(cursorLineNum, 0)
  const requireEnd = new vscode.Position(cursorLineNum, requireLineLength)
  const requireRange = new vscode.Range(requireStart, requireEnd)
  console.log('requireRange', requireRange)

  const updatedRequireLine = requireLine.replace(/: require.*$/, `: ${moduleName},`)

  const { index, isEmptyLine } = getIndexOfFirstListBelowImports(lines)
  const newImportLinePosition = new vscode.Position(Math.max(index - 1, 0), 0)
  let addedImportLine = `import ${moduleName} from '${moduleFilepath}'\n`
  if (!isEmptyLine) addedImportLine += '\n'

  vscode.window.activeTextEditor.edit(editBuilder => {
    console.log('editBuilder', editBuilder)
    editBuilder.replace(requireRange, updatedRequireLine)
    editBuilder.insert(newImportLinePosition, addedImportLine)
  })
}

module.exports = {
  convertCamelCase: textEditor => convert(textEditor, camelCase),
  convertPascalCase: textEditor => convert(textEditor, pascalCase),
}
