import { addDocument } from "../../app/api-admin";

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
    }
};
export default {
    actions
};