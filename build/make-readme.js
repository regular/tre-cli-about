const help = require('../help')
const pkg = require('../package.json')

const bin = 'tre-cli-about'
const year = new Date().toISOString().split('-')[0]
const readme = `# ${bin}

Publishes about messages with name, description and image properties to an ssb network.
Uploads image files as blobs and supports reading images from stdin.

\`\`\`
${help('tre-cli-about')}
\`\`\`

---
License: ${pkg.license} Copyright ${year} ${pkg.author}
`

console.log(readme)
