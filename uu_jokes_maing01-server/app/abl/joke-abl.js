"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const path = require("path");
const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {

  getUnsupportedKeys:{
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys:{
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys:{
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};



class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }






}

module.exports = new JokeAbl();
