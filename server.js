const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 3600000
  }, 
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const isDevelopment = process.env.NODE_ENV === 'development';
const listenMessage = isDevelopment ? `Now listening on http://localhost:${PORT}/` : 'Now listening';

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(listenMessage));
});
