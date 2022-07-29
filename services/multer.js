import Multer from 'multer';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  },
});

export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export default Multer({
  storage: Multer.memoryStorage(),
});
