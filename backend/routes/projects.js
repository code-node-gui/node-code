const express = require("express");
const router = express.Router();

const {
    createProject,
    getAllProjects,
    getProject,
    deleteProject,
    updateProject,
    saveProject,
    getDataProject
} = require("../controllers/ProjectControler")



router.get("/",getAllProjects)

router.get("/:id",getProject)

router.post("/",createProject)

router.post("/save-data/:id",saveProject)

router.get("/get-data/:id",getDataProject)

router.delete("/:id",deleteProject)

router.patch("/:id",updateProject)

module.exports = router