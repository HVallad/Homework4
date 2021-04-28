const Mongoose = require('mongoose');

const NameSchema = new Mongoose.Schema({
  Name: { type: String, required: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
});

module.exports = Mongoose.model('Name', NameSchema);
