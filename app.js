const express = require('express');
const ProductController = require('./controllers/ProductController');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// requisito 1
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);
// requisito 3
app.post('/products', ProductController.addProduct);

app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
