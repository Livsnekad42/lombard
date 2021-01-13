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
            axios.post('https://json.com', {
                method: "POST",
                body: {
                    datta: data
                }
            })
        }
    },
    mutations: {
        setProlongationStatus(state, status) {
            state.prolongationStatus = status.completed;
        },
    },
    state: {
        prolongationStatus: "",
        prolongationMessage: ""
    },
    getters: {
        getProlongationStatus(state) {
            return state.prolongationStatus;
        }
    }
}