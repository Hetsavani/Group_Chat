const mongoose = require('mongoose');

const chat = new mongoose.Schema({
    name: {
      type: String,
      // required: true
    },
    message: {
      type: String,
      // required: true
    }
  });
const meeting = new mongoose.Schema({
    ID: {
      type: String,
      // required: true
    },
    chats: {
      type: [chat], // Array of strings
      // required: true
    }
  });

const schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        pastMeetings:{
            type: Array,
            default: [],
            // required: true
        }
    }
);
module.exports = mongoose.model('Users',schema);