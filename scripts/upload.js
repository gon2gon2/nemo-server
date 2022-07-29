import { Storage } from '@google-cloud/storage';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const path = '../uploads';
fs.readdir(path, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      console.log(file);
      const blob = bucket.file(file);
      const blobStream = blob.createWriteStream();
      blobStream.on('error', blobError => console.log(blobError));
      blobStream.end(fs.readFileSync(`${path}/${file}`));
    });
  }
});
