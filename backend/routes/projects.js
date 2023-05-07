const express = require("express");
const router = express.Router();

const {
    createProject,
    getAllProjects,
    getProject,
    deleteProject,
    updateProject
} = require("../controllers/ProjectControler")



router.get("/",getAllProjects)

router.get("/:id",getProject)

router.post("/",createProject)

router.delete("/:id",deleteProject)

router.patch("/:id",updateProject)

module.exports = router