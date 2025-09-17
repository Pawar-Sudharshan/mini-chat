// models/chat.js - MongoDB Schema and Model Definition
// This file creates the database structure for storing chat messages

const mongoose = require("mongoose"); // Import mongoose for MongoDB operations

// Define the schema structure for chat messages
const chatSchema = new mongoose.Schema({
    from: {
        type: String,        // Data type is String
        require: true        // This field is mandatory (Note: should be 'required' not 'require')
    },
    to: {
        type: String,        // Data type is String  
        require: true        // This field is mandatory (Note: should be 'required' not 'require')
    },
    message: {
        type: String,        // Data type is String
        // maxLength: 50     // Optional: Limit message length to 50 characters (commented out)
    },
    created_at: {
        type: Date,          // Data type is Date for timestamp
        require: true        // This field is mandatory (Note: should be 'required' not 'require')
    }
});

// Create a model from the schema
// Model name will be 'Chat' and collection name will be 'chats' (automatically pluralized)
const chat = mongoose.model("Chat", chatSchema);

// Export the model so it can be used in other files
module.exports = chat;