import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import sslRedirect from './ssl/Redirect';

const app = express();

app.use(sslRedirect());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors('*'));
app.use(express.static(path.resolve(__dirname, '../../client', 'build')));
app.use('/v1', indexRouter);
// LAST ROUTE: All remaining requests return the React app, so it can handle routing
// and refreshing
app.get('*', function(request, response) {
  response.sendFile(
    path.resolve(__dirname, '../../client/build', 'index.html')
  );
});

app.use((err, req, res, next) => {
  res.status(400).json({
    error: err.stack,
  });
});

export default app;
