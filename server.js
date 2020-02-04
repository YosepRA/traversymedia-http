const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// These middlewares will be used for 'req.body'.
// The property can't be used if the data is in json format without using 'express.json()' middleware.
app.use(express.json());
// And it can't work for form data if we don't use 'express.urlencoded()'.
app.use(express.urlencoded({ extended: false }));

// Now express has its own 'body-parser'. So there is no need for a body-parser package.
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('Express is here');
  // res.json({ name: 'Joe' });
  // res.send(req.header('host')); // localhost:3000
  // res.send(req.header('user-agent')); // Depend on where the request was originated (Browser or Postman).
  res.send(req.rawHeaders); // An array of headers. Weirly formatted with item[i] to be a key and item[i + 1] to be a value.
});

app.post('/contact', (req, res) => {
  // const { name, age } = req.body;
  // console.log(name, age);
  // ======================================================================================================== //
  // console.log(`The request's content type is: ${req.header('Content-Type')}`);
  // res.send(req.body);
  // ======================================================================================================== //
  if (!req.body.name) {
    // 400: Bad request. The server can not or will not process the request due to something that is percieved ~
    // ~ to be a client error (e.g. Invalid inputs, malformed request syntax, or deceptive request routing).
    return res.status(400).send('Name is required.');
  }
  // 201: Created. The request has been fulfilled and resulted in a new resource being created.
  res.status(201).send(`Thank you ${req.body.name}`);
});

app.post('/login', (req, res) => {
  let token = req.header('x-auth-token');
  if (!token) return res.status(400).send('No token.');
  // 401: Unauthorized.
  if (token !== '123456') return res.status(401).send('Not authorized');

  res.send('Logged in.');
});

app.put('/post/:id', (req, res) => {
  console.log(req.body);
  res.json({
    id: req.params.id,
    title: req.body.title
  });
});

app.listen('3000', () => console.log('The server is listening at port 3000'));
