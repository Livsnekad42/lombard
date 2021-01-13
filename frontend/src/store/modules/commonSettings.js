import { saveSettings } from "../../app/api-admin";

const actions = {
    saveSettings({getters}, data) {
        return new Promise((resolve, reject) => {
            saveSettings(data)
                .then(res => {
                    if (res.data.err) reject(res);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
}

export default {
    actions
};