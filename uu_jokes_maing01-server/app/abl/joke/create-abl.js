"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/joke-error.js");

const EXECUTIVES_PROFILE = "Executives";

const WARNINGS = {
  createUnsupportedKeys:{
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(dtoIn, awid, session, authorizationResult) {

    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.awid = awid;


    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);

    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Create.InvalidDtoIn({uuAppErrorMap}, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new CreateAbl();
