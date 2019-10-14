const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const mongoose = require('mongoose');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const fileStoreOptions = {};
app.use(
  session({
    // store: new FileStore(fileStoreOptions),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);

// catch 404 and forward to error handler
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

// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const indexRouter = require('./routes/index');

// io.on('connection', (socket) => {
//   console.log('connection on');

//   socket.emit('connections', Object.keys(io.sockets.connected).length);

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });

//   socket.on('chat-message', (data) => {
//     socket.broadcast.emit('chat-message', data);
//   });

//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data);
//   });

//   socket.on('stopTyping', () => {
//     socket.broadcast.emit('stopTyping');
//   });

//   socket.on('joined', (data) => {
//     socket.broadcast.emit('joined', data);
//   });

//   socket.on('leave', (data) => {
//     socket.broadcast.emit('leave', data);
//   });
// });
app.use('/', indexRouter);
app.listen(port, () => console.log(`App listening on port ${port}!`));
