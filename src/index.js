import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import debug from 'debug';
import makeServer from './server.js';

const log = debug('hexlet-phonebook');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (port) => {
  fs.readFile(path.resolve(__dirname, 'phonebook.txt'), (err, data) => {
    if (err) {
      throw err;
    }

    const users = data.toString()
      .trim()
      .split('\n')
      .reduce((acc, value) => {
        const [id, name, phone] = value.split('|').map((item) => item.trim());
        return { ...acc, [id]: { name, phone } };
      }, {});

    makeServer(log, users).listen(port);
    log(`server was started on localhost:${port}`);
  });
};
