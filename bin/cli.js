#!/usr/bin/env node
const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { join } = require('path')
const { spawnSync } = require('child_process')
const { existsSync } = require('fs')
const { runnerFilePath } = require('./utils')

const execute = () => spawnSync(
  process.execPath,
  [`${runnerFilePath}`].concat(process.argv.slice(2)),
  { stdio: 'inherit', detached: true }
)

if (existsSync(runnerFilePath)) {
  execute()
} else {
  esbuild.build({
    entryPoints: [join(__dirname, '..', 'src', 'index.ts')],
    outfile: runnerFilePath,
    bundle: true,
    platform: 'node',
    target: `node${process.versions.node.split('.')[0]}`,
    plugins: [nodeExternalsPlugin()]
  }).then(execute)
}
