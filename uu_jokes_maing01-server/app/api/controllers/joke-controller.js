"use strict";

const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {

    create(ucEnv) {
        return JokeAbl.jokeCreate( ucEnv.getDtoIn(), ucEnv.getUri().getAwid(),  ucEnv.getSession(), ucEnv.getAuthorizationResult() );
    }
}

module.exports = new JokeController();

