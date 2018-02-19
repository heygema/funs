// @flow
function pipe(readStream: *, writeStream: *) {
  readStream.on('data', ch => {
    let shouldContinue = writeStream.write(ch);
    if (!shouldContinue) {
      readStream.pause();
    }
    writeStream.once('drain', () => {
      readStream.resume();
    });
  });
  readStream.on('end', () => {
    writeStream.end();
  });
}

export default pipe;
