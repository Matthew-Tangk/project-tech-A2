const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController.js");

router.get("/add-artists", profileController.addArtists);
router.post("/add-artists", profileController.profile);

module.exports = router;
