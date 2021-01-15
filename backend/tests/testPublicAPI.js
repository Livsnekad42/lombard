const requests = require("./requests");

const endpointApi = "public/";

const TestPool = {
    getSettingsApp: () => {
        return new Promise((resolve, reject) => {
            requests.get(endpointApi + "settings")
                .then(resp => resolve(true))
                .catch(err => reject(err));
        });
    },
    calcLoanSuccess: () => {
        return new Promise((resolve, reject) => {
            const data = {
                creditSum: 120,
                creditPeriod: 20
            };
            requests.post(endpointApi + "calculate", data)
                .then(resp => resolve(true))
                .catch(err => reject(err));
        });
    },
    calcLoanUnSuccess: () => {
        return new Promise((resolve, reject) => {
            const data = {
                creditSum: '9',
                creditPeriod: 20
            };
            requests.post(endpointApi + "calculate", data)
                .then(resp => reject(new Error("Validator error")))
                .catch(err => { console.log(err.response.data);return resolve(true) });
        });
    }
};

function StartTest() {
    for ( const key in TestPool ) {
        const test = TestPool[key];
        test()
            .then(ok => {
                console.log(`${key} - success`);
            })
    }
}

StartTest();