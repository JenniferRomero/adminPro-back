const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log('OK DB');
    } catch (error) {
        console.log('Error', error);
        throw new Error('Error  al ahora de iniciar la base de datos');
    }
};

module.exports = {dbConnection};