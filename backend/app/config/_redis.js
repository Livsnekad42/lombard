const redis = require("redis");
const settings = require("./_setings");
const { getAuthorization } = require("../services/authService");


const RedisApi = (function () {
    let instance = null;

    function RedisApi() {
        if(!instance){
            instance = this;
        }else{
            return instance;
        }

        this.authNameField = "authElombard";
        this.redis = null;

        this._init = function () {
            this.redis = redis.createClient();

            this.redis.on("error", function(error) {
                console.error("Redis connect err: ", error);
                return null;
            });

            this.redis.ping(err => {
                if ( !!err ) {
                    console.error("Redis ping err: ", err);
                }
                return null;
            });
        };
        this.getRedisConnect = function () {
            if ( !this.redis ) {
                this._init();
            }
            return this.redis;
        };
        this.setData = function (_key, value) {
            const r = this.getRedisConnect();
            r.set(_key, value, 'EX', settings.expiresToken);
        };
        this.getData = function (_key) {
            const r = this.getRedisConnect();
            return new Promise((resolve, reject) => {
                r.get(_key, (err, data) => {
                    resolve(data);
                });
            });
        };
        this.setAuthToken = function (){
            return new Promise((resolve, reject) => {
                const r = this.getRedisConnect();
                const sendData = {
                    login: settings.mainLogin,
                    password: settings.mainPassword,
                };
                getAuthorization().then(data => {
                    const token = data.data.token;
                    r.set(this.authNameField, token, 'EX', settings.expiresToken);
                    resolve(token);
                }).catch(err => {
                    reject(err);
                });
            });
        };
        this.getAuthToken = function () {
            return new Promise((resolve, reject) => {
                this.getData(this.authNameField).then(data => {
                    if ( !data ) {
                        this.setAuthToken()
                            .then(token => {
                                resolve(token);
                            })
                            .catch(err => {
                                reject(err);
                            });
                    } else {
                        resolve(data.toString());
                    }
                });
            });
        }
    }
    return RedisApi;
}());

module.exports = RedisApi;