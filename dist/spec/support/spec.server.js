"use strict";
const express = require("express");
const path = require("path");
const OracleBot = require("../../lib");
const CONF = require("./spec.config");
const app = express();
// enable auth/parser at root level
app.use(OracleBot.middleware({
    parser: CONF.parser,
    auth: {
        type: OracleBot.AUTH_TYPE.BASIC,
        credentials: CONF.auth,
    },
}));
// add prefixed /component middleware
app.use(CONF.componentPrefix, OracleBot.middleware({
    root: __dirname,
    component: {
        baseDir: path.join(__dirname, 'example/components')
    }
}));
// some things behind the bot MW
app.get('/', (req, res) => {
    res.send(CONF.messages.OK);
});
// to test parser
app.post('/echo', (req, res) => {
    res.json(req.body);
});
// export the http.Server for supertest
const server = app.listen(CONF.port, () => {
    console.log(`spec server listening on :${CONF.port}`);
});
module.exports = server;
//# sourceMappingURL=spec.server.js.map