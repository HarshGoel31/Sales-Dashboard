import { Router } from "express";
import { statesController, dateRangeController, dashboardController } from "../controllers/dashboardController";

const router = Router();

router.get("/states", statesController);
router.get("/date-range", dateRangeController);
router.get("/dashboard", dashboardController);

export default router;
