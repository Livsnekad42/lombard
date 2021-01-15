import { saveSettings} from "@/app/api-admin";
import axios from "axios";

export default {
    actions: {
        async getProlongationStatus(context) {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos/4');
            const status = await res.json()

            context.commit('setProlongationStatus', status);
        },
        saveSettings(ctx, data) {
            ctx.commit('setProlongationStatus', data);
        }
    },
    mutations: {
        setProlongationStatus(state, status) {
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