# Setup Instructions - WhatsApp Clone Chat Application

## Quick Start Guide

### Step 1: Create Project Folder
```bash
mkdir chat-app
cd chat-app
```

### Step 2: Initialize Node.js Project
```bash
npm init -y
```

### Step 3: Install Required Packages
```bash
npm install express mongoose ejs method-override path
```

### Step 4: Create Project Structure
```bash
mkdir models views public
```

### Step 5: Create Files

#### Create models/chat.js
Copy the content from `commented-chat-model.js`

#### Create index.js 
Copy the content from `commented-index-server.js`

#### Create views/index.ejs
Copy the content from `commented-index-view.html`

#### Create views/new.ejs
Copy the content from `commented-new-view.html`

#### Create views/edit.ejs
Copy the content from `commented-edit-view.html`

### Step 6: Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### Step 7: Run the Application
```bash
node index.js
```

### Step 8: Open Browser
Navigate to: `http://localhost:8080/chats`

## Important Links and Modifications

### Required CDN Links
- **Bootstrap CSS**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css`
- **Bootstrap JS**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js`

### Database Connection
- **MongoDB URL**: `mongodb://127.0.0.1:27017/whatsapp`
- **Database Name**: whatsapp
- **Collection**: chats (auto-created)

### Port Configuration
- **Server Port**: 8080
- **Access URL**: `http://localhost:8080`

## Key Modifications Made

### 1. Schema Fixes Needed
In `models/chat.js`, change `require` to `required`:
```javascript
// Change this:
require: true
// To this:
required: true
```

### 2. Method Override Setup
Added method-override middleware to handle PUT/DELETE requests from HTML forms.

### 3. Bootstrap Integration
- Added Bootstrap 5.3.8 CDN links
- Used responsive grid system (col-4)
- Applied Bootstrap classes for styling

### 4. Error Handling
- Added try-catch blocks for database operations
- Proper error responses with status codes

### 5. Route Structure
- GET `/` - Root endpoint
- GET `/chats` - Display all chats
- GET `/chats/new` - New chat form
- POST `/chats` - Create new chat
- GET `/chats/:id/edit` - Edit form
- PUT `/chats/:id` - Update chat
- DELETE `/chats/:id` - Delete chat

## Testing the Application

### Test Scenarios:
1. **Create Chat**: Go to `/chats/new` and create a message
2. **View Chats**: Visit `/chats` to see all messages
3. **Edit Chat**: Click edit button on any chat
4. **Delete Chat**: Click delete button to remove chat
5. **Server Status**: Visit `/` to check if server is running

## Troubleshooting

### Common Issues:
- **Port 8080 in use**: Change port in `index.js`
- **MongoDB not connected**: Start MongoDB service
- **Module not found**: Run `npm install`
- **Forms not working**: Check method-override setup

### File Structure Check:
```
chat-app/
├── models/
│   └── chat.js
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
├── public/
├── index.js
├── package.json
└── node_modules/
```