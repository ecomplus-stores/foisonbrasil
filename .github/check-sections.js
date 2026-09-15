#!/usr/bin/env node
/**
 * Valida que todo tipo de seção usado em content/**\/*.json possui um template
 * correspondente em template/pages/@/sections/<type>.ejs.
 *
 * Motivo: em 15/09/2026 o CMS gravou uma seção de tipo "apx_banner-slider" na home,
 * sem template, e o SSR passou a responder HTTP 302 vazio para a página inteira.
 *
 * Uso: node .github/check-sections.js   (exit 1 se encontrar problema)
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const contentDir = process.env.CONTENT_DIR || path.join(root, 'content')
const sectionsDir = path.join(root, 'template', 'pages', '@', 'sections')

const templates = new Set(
  fs.readdirSync(sectionsDir)
    .filter(f => f.endsWith('.ejs'))
    .map(f => f.replace(/\.ejs$/, ''))
)

const problems = []

const walk = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name.endsWith('.json')) {
      let data
      try {
        data = JSON.parse(fs.readFileSync(full, 'utf8'))
      } catch (err) {
        problems.push(`${path.relative(root, full)}: JSON inválido (${err.message})`)
        continue
      }
      if (!data || !Array.isArray(data.sections)) continue
      data.sections.forEach((section, i) => {
        if (!section || section.enabled === false) return
        if (typeof section.type !== 'string' || !section.type) {
          problems.push(`${path.relative(root, full)}: seção #${i} sem "type"`)
        } else if (!templates.has(section.type)) {
          problems.push(
            `${path.relative(root, full)}: seção #${i} usa o tipo "${section.type}", ` +
            `mas não existe template/pages/@/sections/${section.type}.ejs`
          )
        }
      })
    }
  }
}

walk(contentDir)

if (problems.length) {
  console.error('✖ Seções inválidas encontradas:\n')
  problems.forEach(p => console.error('  - ' + p))
  console.error('\nCorrija o conteúdo (ou crie o template) antes de publicar.')
  process.exit(1)
}
console.log(`✔ Todas as seções de content/ possuem template (${templates.size} tipos disponíveis).`)
