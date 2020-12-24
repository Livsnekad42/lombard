const db = require("../config/db_config");
const settings = require("./../config/_setings");
const Comments = db.comments;

/**
 * Метод добавления комментария
 *
 * @param data
 */
exports.addComment = async (data) => {
    try {
        return await Comments.create(data);
    } catch (e) {
        return e;
    }
};

exports.getCommentList = async () => {
    try {
        return await Comments.findAll();
    } catch (e) {
        return e;
    }
}

/**
 * Метод удаления документа
 *
 * @param id
 */
exports.destroyComment = async (id) => {
    try {
        return await Comments.destroy({
            where: {
                id,
            },
        });
    } catch (e) {
        return e;
    }
};

exports.editComment = async (data) => {
    try {
        return await Comments.update(data, {
            where: { id: data.id },
            returning: true,
        });
    } catch (e) {
        return e;
    }
};