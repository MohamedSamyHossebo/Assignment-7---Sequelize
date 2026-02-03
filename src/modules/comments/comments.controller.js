import { Router } from "express";
import * as commentService from "./comments.service.js";
const router = Router();

router.post("/", commentService.createBulkComment);
router.post("/find-or-create", commentService.findOrCreateComment);
router.get("/newest/:postId", commentService.getNewestThreeComments);
router.get("/search/", commentService.searchCommentsByWord);
router.get("/:commentId", commentService.getCommentDetails);
export default router;