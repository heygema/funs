import fs from 'fs';
import mime from 'mime';

export function ServerErrorPage(rq, rs) {
  rs.writeHead(404, 'Content-Type', 'text/plain');
  rs.end(`<p>404. Anything you looking for, Not Found.</p>`);
}

export function ServeFile(rq, rs, filePath) {
  let readStream = fs.createReadStream(filePath);
  let fileExt = filePath.split('.').pop();
  readStream.on('error', () => {
    ServerErrorPage(rq, rs);
  });
  let m = mime.getType(fileExt);
  let contentType = {'Content-Type': m};
  readStream.pipe(rs);
  readStream.on('end', () => {
    rs.writeHead(200, contentType);
    rs.end();
  });
}

export function rts(rq, rs) {
  rs.writeHead(302, {
    Location: 'https://stackoverflow.com/sdfsdfda',
  });
  rs.end();
}

export function UploadFile(rq, rs) {}