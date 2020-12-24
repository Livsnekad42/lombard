import { getListComment, addComment, delComment, editComment } from "../../app/api-admin";

const actions = {
    addComment({ getters }, data) {
        return new Promise((resolve, reject) => {
            addComment(data)
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getListComment({getters}) {
        return new Promise((resolve, reject) => {
            getListComment()
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteComment({getters}, id) {
        return new Promise((resolve, reject) => {
            delComment({id})
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    editComment({getters}, data) {
        return new Promise((resolve, reject) => {
            editComment(data)
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};
export default {
    actions
};