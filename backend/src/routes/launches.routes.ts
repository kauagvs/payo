import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const lauchsRouter = Router();

const json = path.resolve(__dirname, '../json/launches.json');

lauchsRouter.get('/', (request, response) => {
  fs.readFile(json, (err, data) => {
    response.write(data);
    response.end();
  });
});

export default lauchsRouter;
