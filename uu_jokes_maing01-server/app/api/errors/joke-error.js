"use strict";

const ErrorBase = require("./jokes-main-use-case-error.js");

const JokeCreate = {
    UC_CODE: `${ErrorBase.JOKES_MAIN_ERROR_PREFIX}joke/create/`, 
    
    InvalidDtoIn: class extends ErrorBase {
      constructor() {
        super(...arguments);
        this.code = `${JokeCreate.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
    JokeDaoCreateFailed: class extends ErrorBase {
        constructor() {
          super(...arguments);
          this.code = `${JokeCreate.UC_CODE}jokeDaoCreateFailed`;
          this.message = "Create joke by joke Dao create failed.";
        }
    },
    
  };
  
  module.exports = {
    JokeCreate
  };
  