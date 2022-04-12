"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {


  init(ucEnv) {
    return JokesMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  sayHello(ucEnv) {
    return JokesMainAbl.sayHello( ucEnv.getDtoIn());
  }

}

module.exports = new JokesMainController();
