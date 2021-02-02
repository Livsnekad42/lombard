const supertest = require("supertest");
const assert = require("assert");

var app = require("./server").app;

// TODO: Разобраться как эту хрень запускать
// TODO: Мигрировать все тысты в mocha
it("public api getSettingsApp Test", function(done){
    supertest(app)
        .get("/api/public/settings/")
        .expect((response) => {
            assert.equal(response.length > 0, true);
        })
        .end(done);
});