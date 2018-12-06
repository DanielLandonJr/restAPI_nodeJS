const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

// create a schema for the Customer.apply..what does it look like
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

// add timestamp to our schema
CustomerSchema.plugin(timeStamp);

// create a new customer model
const Customer = mongoose.model('Customer', CustomerSchema);

// export the model
module.exports = Customer;
