"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/joke-error.js");


const WARNINGS = {
  getUnsupportedKeys:{
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  }
};

class GetAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async get(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut;
    try{
      dtoOut = await this.dao.getById(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Get.JokesDoesNotExist({ uuAppErrorMap });
    }


    if(!dtoOut) {
      throw new Errors.Get.JokesDoesNotExist({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }



}

module.exports = new  GetAbl();
