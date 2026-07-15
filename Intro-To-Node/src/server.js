import http from 'node:http'
import open from 'open'

const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || '';
  });
}

const formatNotes = (notes) => {
  return notes.map(note => {
    return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `
  }).join('\n')
}

const HTML_TEMPLATE = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notes</title>
  </head>
  <body>
    <h1>Notes</h1>
    <div class="notes">
      {{notes}}
    </div>
  </body>
</html>
`

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const html = interpolate(HTML_TEMPLATE, { notes: formatNotes(notes) })

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  });
}

export const start = (notes, port) => {
  const server = createServer(notes)
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`)
}