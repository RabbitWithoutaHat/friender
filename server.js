const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
mongoose.connect('mongodb://localhost/friender', {
  useNewUrlParser: true,
});
const db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const fileStoreOptions = {};
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: db,
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { expires: 600000 },
  }),
);

// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const users = require('./models/User')();
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
