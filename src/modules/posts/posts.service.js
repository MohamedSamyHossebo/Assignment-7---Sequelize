import { postsModel, userModel, commentsModel } from "../../DB/models/index.js";
import { sequelize } from "../../DB/connection.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        if (!title || !content || !userId) {
            return res.status(400).json({ message: "Please provide the required data" })
        }
        if (isNaN(Number(userId))) {
            return res.status(400).json({ message: "Please provide valid userId as Number" })
        }
        const post = await postsModel.create({ title, content, userId });
        return res.status(201).json({ message: "Post created successfully", post })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const getAllPosts = async (req, res) => {
    try {
        // Find All posts with creator information
        const posts = await postsModel.findAll(
            {
                attributes: { exclude: ['content'] },
                include: [{
                    model: userModel,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: commentsModel,
                    as: 'comments',
                    attributes: ['id', 'content']
                }],
            }
        );

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }
        return res.status(200).json({ message: "All posts", posts });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommentCount = async (req, res) => {
    try {
        const posts = await postsModel.findAll({
            attributes: {
                exclude: ['content', 'createdAt', 'updatedAt', 'deletedAt', 'userId'],
                include: [
                    [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentCount']
                ]
            },
            include: [{
                model: commentsModel,
                as: 'comments',
                attributes: [],
            }],
            group: ['Posts.id'],
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json({ message: "All posts with comment counts", posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        if (isNaN(Number(postId))) {
            return res.status(400).json({ message: "Please provide valid postId as Number" })
        }

        const findPost = await postsModel.findOne({ where: { id: postId } })
        if (!findPost) {
            return res.status(404).json({ message: "Post not found" })
        }

        // Check Authority
        if (userId !== findPost.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const deletedPost = await postsModel.destroy({ where: { id: postId } })
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" })
        }
        return res.status(200).json({ message: "Post deleted successfully", deletedPost })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};