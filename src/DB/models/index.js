import userModel from "./user/user.model.js";
import commentsModel from "./comments/comments.model.js";
import postsModel from "./posts/posts.model.js";

userModel.hasMany(postsModel, {
    foreignKey: "userId",
    as: "posts"
});

postsModel.belongsTo(userModel, {
    foreignKey: "userId",
    as: "user"
});

userModel.hasMany(commentsModel, {
    foreignKey: "userId",
    as: "comments"
});

commentsModel.belongsTo(userModel, {
    foreignKey: "userId",
    as: "user"
});

postsModel.hasMany(commentsModel, {
    foreignKey: "postId",
    as: "comments"
});

commentsModel.belongsTo(postsModel, {
    foreignKey: "postId",
    as: "post"
});

export { userModel, commentsModel, postsModel }