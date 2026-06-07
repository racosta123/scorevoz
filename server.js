const http = require('http');
const fs   = require('fs');
const path = require('path');
const ROOT = __dirname;

http.createServer((req, res) => {
  const url  = req.url === '/' ? '/index.html' : req.url;
  const file = path.join(ROOT, url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file).slice(1);
    const mime = { html:'text/html', js:'application/javascript', css:'text/css', json:'application/json' };
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(5500, () => console.log('Servidor listo: http://localhost:5500'));
