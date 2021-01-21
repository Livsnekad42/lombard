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
            const processingPercent = response.data.find(elem => elem.fieldName == 'processingPercent');
            if (processingPercent && !isNaN(+processingPercent.value)) {
                percent = +processingPercent.value;
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