/**
 * Build-time prerender: injects the server-rendered app into dist/index.html.
 * Runs after `vite build` (client) and `vite build --ssr` (server entry).
 */
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const serverDir = path.join(root, 'dist-server')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(indexPath, 'utf8')

const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`)

await writeFile(indexPath, template.replace(placeholder, `<div id="root">${await render()}</div>`))
await rm(serverDir, { recursive: true, force: true })
console.log('prerender: dist/index.html updated')
