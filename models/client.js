const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    email:{
      type: String
    },
    address:{
      type: String,
      required: true
    },
    phnumber:{
        type: String,
        required: true
    },
    total_balance_amount:{
      type: Number
    },
    sites:{
      address:{
        type: String,
        required: true
      },
      total_balance:{
        type: Number,
        required: true
      }
    },
    reference:{
      type: String
    }
});


const Client = mongoose.model('Client', ClientSchema);
module.exports=Client;
