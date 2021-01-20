import { getSettings, editSetting} from "@/app/api-admin";

export default {
    state: {
        processingPercent: ''
    },
    actions: {
        getAllSetting(context) {
            return new Promise((resolve, reject) => {
                getSettings()
                    .then(res => {
                        if (res.data.err) reject(res);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        async setPercent(context, val) {
            const response = await new Promise((resolve, reject) => {
                editSetting(val)
                    .then(res => {
                        if (res.data.err) reject(res);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
            let percent = 0;
            const processingPercent = response.data.setting.value;

            if (processingPercent && !isNaN(+processingPercent)) {
                percent = +processingPercent;
            };
            context.commit('setProcessingPercent', percent);
        },
        async actualizePercent(context) {
            const response = await new Promise((resolve, reject) => {
                getSettings()
                    .then(res => {
                        if (res.data.err) reject(res);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
            let percent = 0;
            const processingPercent = response.data.find(elem => elem.fieldName == 'processingPercent').value;
            if (processingPercent && !isNaN(+processingPercent)) {
                percent = +processingPercent;
                context.commit('setProcessingPercent', percent);
            };
        }
    },
    getters: {
        getProcessingPercent(state) {
            return state.processingPercent;
        }
    },
    mutations: {
        setProcessingPercent(state, percent) {
            state.processingPercent = percent;
        }
    }
}