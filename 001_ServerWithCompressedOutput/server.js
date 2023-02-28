const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
  // Read the index.html file
  fs.readFile('./index.html', (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file');
      return;
    }

    // Compress the file using gzip
    zlib.gzip(content, (err, compressed) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error compressing file');
        return;
      }

      // Set response headers
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip',
        'Content-Length': compressed.length
      });

      // Send the compressed file as response
      res.end(compressed);
    });
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
