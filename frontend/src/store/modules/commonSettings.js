import {createSettings, getListComment, getSettings, editSetting} from "@/app/api-admin";
import axios from "axios";

export default {
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
        }
    }
}