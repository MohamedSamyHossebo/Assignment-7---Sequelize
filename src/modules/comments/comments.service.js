import { commentsModel, postsModel, userModel } from "../../DB/models/index.js";
import { Op } from "sequelize";

export const createBulkComment = async (req, res) => {
    try {
        const { comments } = req.body;

        if (!comments || !Array.isArray(comments) || comments.length === 0) {
            return res.status(400).json({
                message: "Please provide a valid comments array with at least one comment"
            });
        }

        for (const comment of comments) {
            if (!comment.content || !comment.userId || !comment.postId) {
                return res.status(400).json({
                    message: "Each comment must have content, userId, and postId"
                });
            }
            if (isNaN(Number(comment.userId)) || isNaN(Number(comment.postId))) {
                return res.status(400).json({
                    message: "userId and postId must be valid numbers"
                });
            }
        }
        const post = await postsModel.findByPk(comments[0].postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const createdComments = await commentsModel.bulkCreate(comments);
        return res.status(201).json({ message: "Comments created successfully", createdComments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getCommentDetails = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ message: "Please provide commentId" });
        }
        if (isNaN(Number(commentId))) {
            return res.status(400).json({ message: "Please provide valid commentId as Number" });
        }
        const comment = await commentsModel.findByPk(commentId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt', 'postId', 'userId']
            },
            include: {
                model: userModel,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }
        });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getNewestThreeComments = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(400).json({ message: "Please provide postId" })
        if (isNaN(Number(postId))) return res.status(400).json({ message: "Please provide valid postId as Number" })
        const comments = await commentsModel.findAll({
            where: { postId },
            order: [['createdAt', 'DESC']],
            limit: 3,
            attributes: {
                exclude: ['updatedAt', 'deletedAt', 'postId', 'userId'],
            }
        })
        if (!comments || comments.length === 0) return res.status(404).json({ message: "No comments found" })
        return res.status(200).json(comments)


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const searchCommentsByWord = async (req, res) => {
    try {
        const { word } = req.query;
        console.log(req.query);
        if (!word) return res.status(400).json({ message: "Please provide word" })
        const comments = await commentsModel.findAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        })
        if (!comments || comments.length === 0) return res.status(404).json({ message: "No comments found" })
        return res.status(200).json({
            count: comments.length,
            comments
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const findOrCreateComment = async (req, res) => {
    try {
        const { content, userId, postId } = req.body;
        if (!content || !userId || !postId) return res.status(400).json({ message: "Please provide the required data" })
        if (isNaN(Number(userId)) || isNaN(Number(postId))) return res.status(400).json({ message: "Please provide valid userId and postId as Number" })
        const [comment, created] = await commentsModel.findOrCreate({
            where: { content },
            defaults: { content, userId, postId }
        })
        if (created) return res.status(201).json({ message: "Comment created successfully", comment })
        return res.status(200).json({ message: "Comment already exists", comment })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content, userId, postId } = req.body;
        if (!commentId) return res.status(400).json({ message: "Please provide commentId" })
        if (isNaN(Number(commentId))) return res.status(400).json({ message: "Please provide valid commentId as Number" })
        const comment = await commentsModel.findByPk(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" })
        if (comment.userId !== userId) return res.status(401).json({ message: "Unauthorized" })
        const updatedComment = await comment.update({ content, userId, postId })
        return res.status(200).json({ message: "Comment updated successfully", updatedComment })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}