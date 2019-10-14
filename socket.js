const connections = [];

function Socket(io, socket) {
  console.log('Успешное соединение');
  // Добавление нового соединения в массив
  connections.push(socket);
  console.log(connections.map((el) => el.client.id), connections.length);
  // Функция, которая срабатывает при отключении от сервера
  socket.on('disconnect', (data) => {
    // Удаления пользователя из массива
    connections.splice(connections.indexOf(socket), 1);
    console.log('Отключились');
  });

  // Функция получающая сообщение от какого-либо пользователя
  socket.on('sendText', (data) => {
    // fs.appendFile('db.json', JSON.stringify(data), err => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Added to DB');
    //   }
    // });

    // Передаем событие 'add mess',
    // Рассылка сообщений пользователям.
    io.sockets.emit('addmess', {
      text: data.text,
      name: data.name,
      // className: data.className
    });
  });
}

module.exports = Socket;
