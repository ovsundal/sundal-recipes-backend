const express = require("express");
const tagsController = require("../controllers/tags-controller");
const { check } = require("express-validator");

const router = express.Router();

router.get("/getTags", tagsController.getTags);

// routes below this requires token verification
// router.use(checkAuth);

router.post("/addTags", [check("name").notEmpty()], tagsController.addTags);

module.exports = router;
