import { Command } from 'commander'
import { join, parse, resolve } from 'path'
import esbuild from 'esbuild'
import nodeExternalsPlugin from 'esbuild-node-externals'
import { spawn } from 'child_process'
import { existsSync } from 'fs'

const program = new Command()
const cacheDir = __dirname


program.on('command:*', () => {
  const [tsFile, ...restOptions] = program.args
  const fullPath = resolve(tsFile)
  const { dir: dirname } = parse(fullPath)
  
  if (!existsSync(fullPath)) {
    console.error(`Error: Could not resolve ${fullPath}`)
    process.exit(1)
  }

  const outfile = join(cacheDir, 'out', 'program.js')
  const injectJs = `
process.argv[1] = '${fullPath}'
var __dirname = '${dirname}'
var __filename = '${fullPath}'
`
  esbuild.build({
    entryPoints: [fullPath],
    outfile,
    bundle: true,
    sourcemap: true,
    platform: 'node',
    target: `node${process.versions.node.split('.')[0]}`,
    banner: {
      js: injectJs
    },
    plugins: [nodeExternalsPlugin()]
  }).then(() => {
    spawn(
      process.execPath,
      [outfile, ...restOptions],
      { stdio: 'inherit', detached: true }
    )
  })
})
program.parse()

