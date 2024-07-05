import { Router } from "express";
import { CreatePlatform, DeletePlatform, GetPlatformById, GetPlatforms, PatchPlatform } from "../controllers/platforms.controllers.js";

const router = Router();



// GET all
router.get('/platforms', GetPlatforms);



// GET by ID
router.get('/platforms/:id', GetPlatformById );



// POST
router.post('/platforms', CreatePlatform );


// Patch
router.patch('/platforms/:id', PatchPlatform);


// DELETE
router.delete('/platforms/:id', DeletePlatform);

export default router;