module.exports = function routes(app) {
    "use strict";

    var Router = require('koa-router');
    var router = new Router();

    router
        .post("/memcached", require("../controllers/memcachedController").postAction)
        .get("/memcached/:key", require("../controllers/memcachedController").getAction)
        .delete("/memcached/:key", require("../controllers/memcachedController").deleteAction);

    app.use(router.middleware());

};