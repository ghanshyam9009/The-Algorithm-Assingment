import express from "express"
import {createorganization} from "../Controllers/orgController.js"


const router = express.Router();

router.post("/create",createorganization )


export default router;