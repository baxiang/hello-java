import { defineConfig } from 'vitepress'
import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { basename, join, relative } from 'path'

const EXCLUDE_DIRS = ['node_modules', '.vitepress', 'docs']
const EXCLUDE_FILES = ['AGENTS.md']
const ROOT = process.cwd()

const LABEL_OVERRIDES: Record<string, string> = {
  '04-collection/01-collection-overview': '集合框架概览',
  '04-collection/02-list': 'List 列表',
  '04-collection/03-set': 'Set 集合',
  '04-collection/04-map': 'Map 映射',
  '04-collection/05-collections': 'Collections 工具类',
  '04-collection/06-advanced': '泛型与进阶',
}

type SidebarItem = {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

type Module = {
  dir: string
  text: string
  link: string
}

function stripOrder(name: string): string {
  return name.replace(/^\d{2}-/, '').replace(/^\d+\.\d+\s*/, '')
}

function humanize(name: string, keepHyphen = false): string {
  const text = stripOrder(name)
  if (keepHyphen) return text.trim()

  return text
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function displayLabel(path: string, fallback: string, keepHyphen = false): string {
  const rel = relative(ROOT, path).replace(/\\/g, '/')
  return LABEL_OVERRIDES[rel] ?? humanize(fallback, keepHyphen)
}

function readTitle(file: string): string | undefined {
  if (!existsSync(file)) return undefined

  const content = readFileSync(file, 'utf-8')
  const match = content.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim()
}

function getLabel(file: string): string {
  return humanize(basename(file, '.md'), true)
}

function mdLink(file: string): string {
  const rel = relative(ROOT, file).replace(/\\/g, '/').replace(/\.md$/, '')
  return `/${rel}`
}

function hasMarkdown(dir: string): boolean {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIRS.includes(entry)) continue

    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory() && hasMarkdown(full)) return true
    if (stat.isFile() && entry.endsWith('.md') && !EXCLUDE_FILES.includes(entry)) return true
  }
  return false
}

function findEntryPage(dir: string): string | undefined {
  for (const name of ['README.md', 'index.md']) {
    const file = join(dir, name)
    if (existsSync(file)) return file
  }

  const entries = readdirSync(dir).sort()
  for (const entry of entries) {
    if (EXCLUDE_DIRS.includes(entry) || EXCLUDE_FILES.includes(entry)) continue

    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isFile() && entry.endsWith('.md')) return full
    if (stat.isDirectory()) {
      const nested = findEntryPage(full)
      if (nested) return nested
    }
  }
}

function collectItems(dir: string): SidebarItem[] {
  const items: SidebarItem[] = []

  for (const entry of readdirSync(dir).sort()) {
    if (EXCLUDE_DIRS.includes(entry) || EXCLUDE_FILES.includes(entry)) continue

    const full = join(dir, entry)
    const stat = statSync(full)

    if (stat.isDirectory()) {
      const children = collectItems(full)
      if (children.length > 0) {
        items.push({
          text: displayLabel(full, entry, true),
          collapsed: false,
          items: children,
        })
      }
      continue
    }

    if (!entry.endsWith('.md')) continue

    items.push({
      text: entry === 'README.md' ? '模块概览' : getLabel(full),
      link: mdLink(full),
    })
  }

  return items
}

function discoverModules(): Module[] {
  const modules: Module[] = []

  for (const entry of readdirSync(ROOT).sort()) {
    if (EXCLUDE_FILES.includes(entry)) continue
    if (EXCLUDE_DIRS.includes(entry) || entry.startsWith('.')) continue

    const full = join(ROOT, entry)
    if (!statSync(full).isDirectory() || !hasMarkdown(full)) continue

    const entryPage = findEntryPage(full)
    if (entryPage) {
      modules.push({
        dir: entry,
        text: readTitle(entryPage) ?? humanize(entry),
        link: mdLink(entryPage),
      })
    }
  }

  return modules
}

function buildSidebar(): Record<string, any> {
  const sidebar: Record<string, any> = {}
  for (const mod of discoverModules()) {
    const dir = join(ROOT, mod.dir)
    const items = collectItems(dir)
    if (items.length === 0) continue
    sidebar[`/${mod.dir}/`] = [
      {
        text: mod.text,
        collapsed: false,
        items,
      },
    ]
  }
  return sidebar
}

const modules = discoverModules()

export default defineConfig({
  srcDir: '.',
  title: 'Hello Java',
  description: 'Java 全栈学习路线教程',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  markdown: {
    html: false,
    lineNumbers: true,
  },

  themeConfig: {
    search: {
      provider: 'local',
    },

    nav: [
      { text: '首页', link: '/' },
      ...modules.map((m) => ({ text: m.text, link: m.link })),
    ],

    sidebar: buildSidebar(),
  },
})
