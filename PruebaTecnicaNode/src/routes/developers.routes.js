import { Router } from "express";
import { CreateDeveloper, DeleteDeveloper, GetDeveloperById, GetDevelopers, PatchDeveloper } from "../controllers/developer.controllers.js";

const router = Router();



// GET all
router.get('/developers', GetDevelopers);



// GET by ID
router.get('/developers/:id', GetDeveloperById );



// POST
router.post('/developers', CreateDeveloper );


// Patch
router.patch('/developers/:id', PatchDeveloper);


// DELETE
router.delete('/developers/:id', DeleteDeveloper);

export default router;