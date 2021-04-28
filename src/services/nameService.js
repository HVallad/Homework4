const Name = require('../models/name');

exports.getNames = async (query) => Name.find({ Name: { $regex: query } }).sort({ Name: 'asc' }).select('-_id -__v');

exports.createName = async (body) => new Name(body).save();
