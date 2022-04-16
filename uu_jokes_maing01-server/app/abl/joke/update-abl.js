"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/joke-error.js");

const EXECUTIVES_PROFILE = "Executives";
const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  updateUnsupportedKeys:{
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async update(awid, dtoIn, session, authorizationResult) {

    let validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.updateUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    // get joke to examine authosr
    let joke = await this.dao.getById(awid, dtoIn.id);


    if ( !joke ){
      // 4.1 joke not found by ID
      throw new Errors.Update.JokesDoesNotExist({ uuAppErrorMap });
    }

    // 5
    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes({AUTHORITIES_PROFILE, EXECUTIVES_PROFILE});
    if (uuIdentity !== joke.uuIdentity && !isAuthorities) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    if(!dtoIn.text){
      throw new Errors.Update.TextCannotBeRemoved({ uuAppErrorMap });
    }

    // set updated data
    joke.name = dtoIn.name;
    joke.text = dtoIn.text;
    joke.awid = awid;

    let updateResult;
    try {
      updateResult = await this.dao.update(joke);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.JokeDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updateResult,
      uuAppErrorMap,
    };

    return dtoOut;
  }

}

module.exports = new UpdateAbl();
