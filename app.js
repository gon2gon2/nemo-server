import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import express from 'express';
import logger from 'morgan';
import path from 'path';

// import routers
import userService from './services/user.service.js';
import cardService from './services/card.service.js';
import tempService from './services/temp.service.js';
import friendService from './services/friend.service.js';
import chatService from './services/chat.service.js';

// database
/* test시 오류가 나고, sync를 하지 않아도 db에서 데이터는 잘 가져옴. 
  테이블 구조 바뀌었을 때만 실행해주면 되는 것 같다.
  */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// socket
app.io = new Server();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '/uploads')));

// apply router
userService(app);
cardService(app);
tempService(app);
friendService(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io.on('connection', chatService);

export default app;
