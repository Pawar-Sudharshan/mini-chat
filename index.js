// index.js - Main Server File with Express.js and MongoDB
// This is the main server file that handles all routes and database operations

// Import required packages
const express = require("express");                    // Web framework for Node.js
const mongoose = require("mongoose");                  // MongoDB object modeling library
const path = require("path");                         // Built-in Node.js module for file paths

// Import the chat model from models folder
const chat = require("./models/chat.js");            // Import our custom chat schema/model

// Create Express application instance
const app = express();

// Import method-override to handle PUT and DELETE requests from forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));                   // Enable method override with _method parameter

// Configure Express middleware and settings
app.set("views", path.join(__dirname, "views"));      // Set the views directory path
app.set("view engine", "ejs");                        // Set EJS as the templating engine
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public folder
app.use(express.urlencoded({ extended: true }));      // Parse URL-encoded form data

// Database connection function
main()
  .then(() => {
    console.log("Connection successful.");             // Log success message when connected
  })
  .catch(err => console.log(err));                    // Log error if connection fails

// Async function to connect to MongoDB database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); // Connect to local MongoDB on port 27017
}

// ROUTE 1: GET /chats - Display all chat messages
app.get("/chats", async (req, res) => {
  try {
    let chats = await chat.find();                     // Fetch all chat documents from database
    res.render("index", { chats });                   // Render index.ejs with chats data
  } catch (error) {
    console.error(error);                             // Log any errors
    res.status(500).send("Error fetching chats");    // Send error response to client
  }
});

// ROUTE 2: POST /chats - Create new chat message
app.post("/chats", async (req, res) => {
  try {
    let { from, message, to } = req.body;             // Destructure form data from request body
    const newChat = new chat({                        // Create new chat document
      from,                                           // Sender name
      message,                                        // Message content
      to,                                            // Receiver name
      created_at: new Date()                         // Current timestamp
    });
    // console.log(newChat);                          // Optional: Log new chat (commented out)
    await newChat.save();                            // Save new chat to database

    let chats = await chat.find();                   // Fetch all chats after saving
    res.render("index", { chats });                 // Render index page with updated chat list
  } catch (error) {
    console.error(error);                           // Log any errors
    res.status(500).send("Error saving chat");     // Send error response to client
  }
});

// ROUTE 3: GET /chats/new - Show form to create new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");                            // Render the new chat form page
});

// ROUTE 4: GET /chats/:id/edit - Show form to edit existing chat
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;                          // Extract chat ID from URL parameters
  let chats = await chat.findById(id);             // Find chat by ID in database
  res.render("edit.ejs", { chats });               // Render edit form with chat data
});

// ROUTE 5: PUT /chats/:id - Update existing chat message
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;                        // Extract chat ID from URL parameters
    let { message } = req.body;                     // Extract new message from form data
    let updatedChat = await chat.findByIdAndUpdate(id, { message: message }); // Update chat in database
    res.redirect("/chats");                         // Redirect to main chats page after update
});

// ROUTE 6: DELETE /chats/:id - Delete specific chat message
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;                          // Extract chat ID from URL parameters
  await chat.findByIdAndDelete(id);                 // Delete chat from database by ID
 
  let chats = await chat.find();                   // Fetch remaining chats after deletion
  res.render("index.ejs", { chats });             // Render index page with updated chat list
});

// ROUTE 7: GET / - Root endpoint for testing
app.get("/", (req, res) => {
  res.send("root is working.");                     // Send simple response to confirm server is running
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log("Server is running on 8080!");       // Log message when server starts successfully
});