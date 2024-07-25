const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/javascriptNote", {
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.error("Erro na conexão:", err);
});
