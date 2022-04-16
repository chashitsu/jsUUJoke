"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/joke-error.js");


const WARNINGS = {
  listUnsupportedKeys:{
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async list(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);

    let dtoOut = await this.dao.listByVisibility(awid, false, dtoIn.pageInfo);

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new ListAbl();
