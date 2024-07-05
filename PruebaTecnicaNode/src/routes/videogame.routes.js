import { Router } from "express";
import { CreateGame, DeleteGame, GetGame, GetGameById, PatchGame } from "../controllers/videogames.controllers.js";
const router = Router();



// GET all
router.get('/videogames', GetGame);



// GET by ID
router.get('/videogames/:id', GetGameById  );



// POST
router.post('/videogames', CreateGame );


// Patch
router.patch('/videogames/:id', PatchGame );


// DELETE
router.delete('/videogames/:id', DeleteGame );

export default router;