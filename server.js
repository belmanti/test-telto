const net = require('net');

const server = net.createServer((socket) => {
  let isFirstMessage = true;
  const imeiList = []; // Array to store IMEI values
  socket.on('data', (data) => {
    if (isFirstMessage) {
      const imei = Buffer.from(data.slice(2)).toString('ascii');
      console.log(`IMEI: ${imei}`);
      imeiList.push(imei); // Add IMEI to the array
      isFirstMessage = false;
    } else {
      const dataStr = data.toString('hex');
      console.log(`Received data: ${dataStr}`);
    }
  });
  socket.on('end', () => {
    console.log('Connection ended');
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});
const port = 9000;
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
