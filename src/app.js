const mongoose = require("mongoose");
const express = require("express");
const socketIo = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);
const chatroutes = require("./routes/chat");
const authRoutes = require("./routes/authRoutes");
const Message = require("./models/message");

mongoose.connect("mongodb://localhost:27017/connectify");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/auth", authRoutes);
app.use("/", (req, res) => {
  res.render("room");
});
app.use("/chat", chatroutes);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`user joined ${room}`);
  });
  socket.on("chatMessage", async ({ msg, room }) => {
    const messages = new Message({ content: msg, room });
    await messages.save();
    io.to(room).emit("message", msg);
    console.log(`${msg} sent to this room = ${room}`);
  });
});
module.exports = server;
