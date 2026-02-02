import { Router } from "express";
import * as userService from "./users.service.js";
const router = Router();

router.get("/", userService.getAllUsers);
router.put("/signup", userService.createOrUpdateUser);
router.get("/by-email", userService.getUserByEmail);
router.get("/:id", userService.getUserById);
router.put("/:id", userService.updateUser);

export default router;