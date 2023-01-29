const express = require("express");
const router = express.Router();
const { createLaunch, getAllLaunches, getLaunch, updateLaunch, deleteLaunch } = require("../controllers/launchesController");


router.post("/", createLaunch);
router.get("/", getAllLaunches);
router.get("/:id", getLaunch);
router.put("/:id", updateLaunch);
router.delete("/:id", deleteLaunch);

module.exports = router;