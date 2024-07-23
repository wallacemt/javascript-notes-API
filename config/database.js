const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/javascriptNote", {
}).then(() => {
    console.log("Conexão bem sucedida");
}).catch((err) => {
    console.error("Erro na conexão:", err);
});
