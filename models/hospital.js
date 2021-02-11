const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection : 'hospitales'});

//cambiar _id de mongoose a id
HospitalSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});


module.exports = model('Hospital', HospitalSchema);