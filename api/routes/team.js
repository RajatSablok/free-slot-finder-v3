const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { PythonShell } = require("python-shell");

const User = require("../models/user");
const Team = require("../models/team");
const UserSlot = require("../models/userSlot");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

//Create a team
router.post("/add", checkAuth, async (req, res, next) => {
  const { teamName } = req.body;
  const createdBy = req.user.userId;

  if (!teamName) {
    return res.status(400).json({
      message: "1 or more parameter(s) missing from req.body",
    });
  }

  const team = new Team({
    _id: new mongoose.Types.ObjectId(),
    teamName,
    createdBy,
  });

  await team
    .save()
    .then(async (result) => {
      res.status(201).json({
        message: "Team created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Get all teams of a user
router.get("/all", checkAuth, async (req, res, next) => {
  const createdBy = req.user.userId;

  await Team.find({ createdBy })
    .select("-__v")
    .then(async (teams) => {
      res.status(200).json({
        teams,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.toString(),
      });
    });
});

//Add member to a team
// router.post("/member/add", checkAuth, async (req, res, next) => {
//   const { teamId, memberName } = req.query;

//   var upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter: fileFilter,
//     onError: function (err, next) {
//       res.status(400).json({
//         message: "Something went wrong",
//         error: err,
//         errormsg: err.toString(),
//       });
//       next(err);
//     },
//   }).single("file");

//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({
//         error: "PLease select correct file",
//       });
//     } else if (err) {
//       return res.status(400).json({
//         message: "Something went wrong",
//         error: err,
//         errormsg: err.toString(),
//       });
//     }

//     let filepath =
//       path.dirname(__dirname).replace("\\api", "") +
//       "/public/uploads/" +
//       req.file.filename;

//     var options = {
//       mode: "text",
//       args: [filepath],
//     };

//     PythonShell.run("./freeSlots.py", options, async function (err, results) {
//       if (err)
//         return res.status(400).json({
//           message: "Something went wrong",
//           error: "Please upload valid and correctly cropped timetable",
//           errormsg: err.toString(),
//           err: err,
//         });
//       else {
//         var timetableArray = JSON.parse(results);
//         const userSlot = new UserSlot({
//           _id: new mongoose.Types.ObjectId(),
//           memberName,
//           timetable: timetableArray,
//           teamId,
//         });
//         await userSlot
//           .save()
//           .then((data) => {
//             res.status(201).json({
//               message: "Uploaded successfully",
//               result: data,
//             });
//           })
//           .catch((err) =>
//             res.status(400).json({
//               message: "Something went wrong",
//               error: err,
//               errormsg: err.toString,
//             })
//           );
//       }
//     });
//   });
// });

router.use("/member", require("../routes/member"));

module.exports = router;
