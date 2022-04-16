"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const path = require("path");
const Errors = require("../api/errors/joke-error.js");
//const { Profiles, Schemas, Jokes } = require("../constants");
//const InstanceChecker = require("../component/instance-checker");

const WARNINGS = {
  createUnsupportedKeys:{
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys:{
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys:{
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys:{
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  }


};

const EXECUTIVES_PROFILE = "Executives";

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create( dtoIn, awid, session, authorizationResult) {

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

  async list(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);

    let dtoOut = await this.dao.listByVisibility(awid, false, dtoIn.pageInfo);

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async get(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut = await this.dao.getById(awid, dtoIn.id);

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


  async delete(awid, dtoIn) {

    let validationResult = this.validator.validate("jokeDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.deleteUnsupportedKeys.code, Errors.Delete.InvalidDtoIn);

    let dtoOut;
    try {
      dtoOut = await this.dao.deleteById(awid, dtoIn.id);
    }
    catch(e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Delete.InvalidDtoIn({uuAppErrorMap}, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }



  async update(awid, dtoIn, session, authorizationResult) {

    let validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    // get joke to examine authosr
    let joke = await this.dao.getById(awid, dtoIn.id);


    // const jokeUpdateDtoOut = {
    //   ..., //uuObject Joke
    //   uuAppErrorMap: {} //uuApp standard errorMap
    // };


  }

}

module.exports = new JokeAbl();
