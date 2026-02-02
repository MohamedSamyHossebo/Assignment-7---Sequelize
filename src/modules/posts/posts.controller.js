import { Router } from "express";
import * as postService from "./posts.service.js";
const router = Router();

router.post("/", postService.createPost);
router.get("/comment-count", postService.getCommentCount);
router.get("/details", postService.getAllPosts)
router.delete("/:postId", postService.deletePost)
export default router;