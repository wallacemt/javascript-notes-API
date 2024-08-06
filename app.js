const express = require('express');
const path = require('path');
const logger = require('morgan');
require("./config/database")
const cors = require("cors")

const usersRouter = require('./app/routes/users');
const notesRouter = require("./app/routes/note")

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use("/notes", notesRouter);



module.exports = app;