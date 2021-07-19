const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false })
.then(function (err) {
  console.log('It worked!');
}, function (err) {
  console.log('An error occurred while creating the table:', err);
}).then(() => {
  app.listen(PORT, () => console.log('========  Now listening ======='));
});
