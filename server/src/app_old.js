import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

const router = express.Router();
router.get('/cities', (req, res) => {
  const cities = [
    { name: 'New York City', population: 8175133 },
    { name: 'Los Angeles', population: 3792621 },
    { name: 'Chicago', population: 2695598 }];
  res.json(cities);
});

app.use(router);

app.use('/*', staticFiles);
app.use('/users', usersRouter);

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


// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3001, () => console.log(`Listening to port ${process.env.PORT || 3001}`));
