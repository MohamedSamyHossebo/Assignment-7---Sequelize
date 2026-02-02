import { Router } from "express";
import * as userService from "./users.service.js";
const router = Router();

router.get("/", userService.getAllUsers);
router.post("/signup", userService.createUser);
router.get("/by-email", userService.getUserByEmail);
router.put("/:id", userService.updateUser);


export default router;