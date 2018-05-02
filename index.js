const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./app/routes');

const app = express();

// DEFININDO A VIEW ENGINE PARA EXTENSÃO DO NUNJUCKS
app.set('view engine', 'njk');
// DEFINDO O CAMINHO ORIGINAL DA PASTA VIEWS DO PROJETO
app.set('views', path.join('app', 'views'));
// DEFINDO O CAMINHO DAS VIEWS DO NUNJUCKS NA APLICAÇÃO
nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app,
});
// DEFININDO O CAMINHO DA PASTA COM ARQUIVOS PUBLIC(CSS, JS, IMGS...)
app.use(express.static(path.resolve('app', 'public')));

app.use('/', routes);

app.listen(3000, () => console.log('Server is running!'));
