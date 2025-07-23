const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todos: [
    {
      id: String,
      item: {
        title: String,
        description: String,
      },
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.model("UserTodos", todoSchema);