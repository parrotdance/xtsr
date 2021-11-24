#!/usr/bin/env node
const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const { join } = require('path')
const { spawnSync } = require('child_process')
const { existsSync } = require('fs')
const { outfile } = require('./utils')

const execute = () => spawnSync(
  process.execPath,
  [`${outfile}`].concat(process.argv.slice(2)),
  { stdio: 'inherit', detached: true }
)

if (existsSync(outfile)) {
  execute()
} else {
  esbuild.build({
    entryPoints: [join(__dirname, '..', 'src', 'index.ts')],
    outfile,
    bundle: true,
    platform: 'node',
    target: `node${process.versions.node.split('.')[0]}`,
    plugins: [nodeExternalsPlugin()]
  }).then(execute)
}
