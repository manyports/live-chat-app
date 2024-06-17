import express from "express"; 
import protectRoute from "../middleware/protectRoute.js";
import { SidebarUsers } from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/", protectRoute, SidebarUsers);

export default router;