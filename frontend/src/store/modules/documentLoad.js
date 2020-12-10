import { addDocument, getListDocument, delDocument } from "../../app/api-admin";

const actions = {
    loadDocument({ getters }, data) {
        return new Promise((resolve, reject) => {
            addDocument(data)
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    getListDocument({getters}) {
        return new Promise((resolve, reject) => {
            getListDocument()
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    deleteDocument({getters}, id) {
        return new Promise((resolve, reject) => {
            delDocument({id})
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