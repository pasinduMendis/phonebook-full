"use strict";
const mongoose = require('mongoose');
const phonebookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    first_name: String,
    last_name: String,
    phone_number: String,
});
module.exports = mongoose.model('PhoneBook', phonebookSchema);
