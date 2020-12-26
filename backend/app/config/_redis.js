const redis = require("redis");
const settings = require("./_setings");
const requests = require("../requests/auth");


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
        this.setAuthToken = function (){
            return new Promise((resolve, reject) => {
                const r = this.getRedisConnect();
                const sendData = {
                    login: settings.mainLogin,
                    password: settings.mainPassword,
                };
                requests.authorized(sendData)
                    .then(resp => {
                        if ( !!resp.errors ) {
                            console.error("Err Auth from Elombard: ", resp.errors);
                            reject("Err Auth from Elombard: " + resp.errors);
                        }
                        const token = resp.data.data.token;
                        r.set(this.authNameField, token, 'EX', settings.expiresToken);
                        resolve(token);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        };
        this.getAuthToken = function () {
            return new Promise((resolve, reject) => {
                const r = this.getRedisConnect();
                r.get(this.authNameField, (err, data) => {
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