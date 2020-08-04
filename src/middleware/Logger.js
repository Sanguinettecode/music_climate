import path from 'path';
import * as rfs from 'rotating-file-stream';

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, '..', 'temp', 'log'),
});

export default accessLogStream;
