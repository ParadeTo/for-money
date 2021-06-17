export async function importHtml(entry) {
  let content = await loadSource(entry)
  const scripts = await parseScript(content, entry)
  const {css, styles} = parseCss(content, entry)
  const body = parseBody(content)
  console.log(scripts, css, styles, body)
}
const ATTR_RE = /["'=\w\s]*/.source

function parseBody(content) {
  const BODY_RE = /<body>([\w\W]*)<\/body>/
  const SCRIPT_RE = /<script["'=\w\s]*>[\s\S]*<\/script>/g
  let bodyContent = content.match(BODY_RE)
  console.log(bodyContent)
}

function parseCss(content, entry) {
  const CSS_LINK_RE = new RegExp(
    '<link' + ATTR_RE + 'href="([^"]+.css[^"]*)"' + ATTR_RE + '/>',
    'g'
  )
  const STYLE_CONTENT_RE = /<style>([^<]*)<\/style>/g
  const CSS_RE = new RegExp(
    '(?:' + CSS_LINK_RE.source + ')|(?:' + STYLE_CONTENT_RE.source + ')',
    'g'
  )

  let match
  let css = []
  let styles = []
  while ((match = CSS_RE.exec(content))) {
    let style
    if (match[1]) {
      style = match[1].trim()
      style && css.push(style)
    } else if (match[2]) {
      style = match[2].trim()
      style && styles.push(style)
    }
  }
  return {css, styles}
}

async function parseScript(content, entry) {
  const SCRIPT_CONTENT_RE = new RegExp(
    '<script' + ATTR_RE + '>([\\w\\W]*)</script>',
    'g'
  )
  const SCRIPT_SRC_RE = new RegExp('<script' + ATTR_RE + 'src="(.+)">', 'g')
  let scripts = []
  const scriptsUrls = []
  let match
  while ((match = SCRIPT_CONTENT_RE.exec(content))) {
    const script = match[1].trim()
    script && scripts.push(script)
  }
  while ((match = SCRIPT_SRC_RE.exec(content))) {
    const url = match[1].trim()
    url && scriptsUrls.push(url)
  }

  let remoteScripts = await Promise.all(
    scriptsUrls.map((url) => {
      let u =
        url.startsWith('http:') || url.startsWith('https:') ? url : entry + url
      return loadSource(u)
    })
  )

  scripts = remoteScripts.concat(scripts)
  return {scripts}
}

function loadSource(url) {
  return window.fetch(url).then((res) => res.text())
}
