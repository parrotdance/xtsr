import { Command } from 'commander'
import { join, resolve } from 'path'
import esbuild from 'esbuild'
import nodeExternalsPlugin from 'esbuild-node-externals'
import { spawn } from 'child_process'
import { existsSync } from 'fs'

const program = new Command()
const cacheDir = __dirname

program.on('command:*', () => {
  const [tsFile, ...restOptions] = program.args
  const absoluteTsFilePath = resolve(tsFile)
  if (!existsSync(absoluteTsFilePath)) {
    console.error(`Error: Could not resolve ${absoluteTsFilePath}`)
    process.exit(1)
  }

  const outfile = join(cacheDir, 'out', 'program.js')
  esbuild.build({
    entryPoints: [absoluteTsFilePath],
    outfile,
    bundle: true,
    sourcemap: true,
    platform: 'node',
    target: `node${process.versions.node.split('.')[0]}`,
    banner: {
      js: `process.argv[1] = '${absoluteTsFilePath}'`
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

