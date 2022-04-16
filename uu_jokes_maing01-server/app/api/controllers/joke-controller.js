"use strict";

const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {

    create(ucEnv) {
        return JokeAbl.create( ucEnv.getDtoIn(), ucEnv.getUri().getAwid(),  ucEnv.getSession(), ucEnv.getAuthorizationResult() );
    }

  list(ucEnv) {
    return JokeAbl.list( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  get(ucEnv) {
    return JokeAbl.get( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  delete(ucEnv) {
    return JokeAbl.delete( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  update(ucEnv) {
    return JokeAbl.update( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }
}

module.exports = new JokeController();

