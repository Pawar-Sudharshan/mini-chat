const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
  .then(async () => {
    console.log("Connection successful.");

    let chats = [
      {
        from: "vikram",
        to: "harsha",
        message: " hello harsha",
        created_at: new Date(),
      },
      {
        from: "AA",
        to: "BBB",
        message: " hello BBB",
        created_at: new Date(),
      },
      {
        from: "CCC",
        to: "DDD",
        message: " hello DDD",
        created_at: new Date(),
      },
      {
        from: "xyz",
        to: "harsha",
        message: " hello xyz",
        created_at: new Date(),
      },
    ];

    try {
      const res = await chat.insertMany(chats);
      console.log("Inserted chats:", res);
    } catch (err) {
      console.error("InsertMany error:", err);
    }
  })
  .catch((err) => console.error("Connection error:", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
