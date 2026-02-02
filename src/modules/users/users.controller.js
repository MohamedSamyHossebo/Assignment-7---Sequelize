import { Router } from "express";
import * as userService from "./users.service.js";
const router = Router();

router.get("/", userService.getAllUsers);
router.get("/by-email", userService.getUserByEmail);
router.get("/:id", userService.getUserById);
router.put("/:id", userService.updateUser);
router.put("/signup", userService.createOrUpdateUser);

export default router;