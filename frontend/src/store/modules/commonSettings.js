import {createSettings, getListComment, getSettings} from "@/app/api-admin";
import axios from "axios";

export default {
    actions: {
        async changeProlongationStatus(context, data) {
            const res = await fetch('http://test.tezlombard.kz/api/settings/settings', {
                method: "POST"
            });
            const result = await res.json();
            console.log(result);

            context.commit('toggleProlongationStatus', data);
        },
        saveSettings(ctx, data) {
            ctx.commit('setProlongationStatus', data);
        },
        createSetting(context, setting) {
            createSettings(setting);
        },
        getSetting(context, setting) {
            return new Promise((resolve, reject) => {
                getSettings()
                    .then(res => {
                        if (res.data.err) reject(res);
                        resolve(res);
                        console.log(res);
                    })
                    .catch(err => {
                        reject(err);
                        console.log(err);
                    });
            });
        }
    },
    mutations: {
        toggleProlongationStatus(state, status) {
            state.prolongationStatus = status;
        },
    },
    state: {
        prolongationStatus: true,
        prolongationMessage: ""
    },
    getters: {
        getProlongationStatus(state) {
            return state.prolongationStatus;
        }
    }
}