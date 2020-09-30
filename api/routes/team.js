const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Team = require("../models/team");

const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

module.exports = router;
