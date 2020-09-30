const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teamName: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [
    {
      name: { type: String },
      timetable: { type: Object },
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
