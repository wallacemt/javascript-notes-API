const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.error("Erro na conexão:", err);
});
