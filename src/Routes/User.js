import express from "express"
import {createuser} from "../Controllers/UserController.js"

const router = express.Router();

router.post("/create",createuser )

export default router;