const mongoose = require("mongoose");

const Post = mongoose.model(
    "post",
    new mongoose.Schema({
        title: String,
        body: String,
        created_by: String,
        active: Boolean,
        geolocation:{
            type: { type: String },
            coordinates: [Number],
        }
    })
  );
  
  module.exports = Post;