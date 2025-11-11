import express from "express";
import { usersByOrganization, organizationFiles } from "../Controllers/AnaylticsController.js";
const router = express.Router();


router.get("/users-by-organization", usersByOrganization);
router.get("/organization-files",organizationFiles);

export default router;