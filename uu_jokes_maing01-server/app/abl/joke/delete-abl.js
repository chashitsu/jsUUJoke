"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/joke-error.js");


const WARNINGS = {
  deleteUnsupportedKeys:{
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  }
};

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async delete(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.deleteUnsupportedKeys.code, Errors.Delete.InvalidDtoIn);


    try {
      await this.dao.deleteById(awid, dtoIn.id);
    }
    catch(e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.InvalidDtoIn({uuAppErrorMap}, e);
      }
      throw e;
    }


    return { uuAppErrorMap };
  }


}

module.exports = new  DeleteAbl();
