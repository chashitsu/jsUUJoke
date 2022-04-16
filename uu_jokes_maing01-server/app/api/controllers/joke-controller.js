"use strict";

const JokeAbl = require("../../abl/joke-abl.js");
const CreateAbl = require("../../abl/joke/create-abl.js");
const ListAbl = require("../../abl/joke/list-abl.js");
const GetAbl = require("../../abl/joke/get-abl.js");
const DeleteAbl = require("../../abl/joke/delete-abl.js");
const UpdateAbl = require("../../abl/joke/update-abl.js");

class JokeController {

  create(ucEnv) {
    return CreateAbl.create( ucEnv.getDtoIn(), ucEnv.getUri().getAwid(),  ucEnv.getSession(), ucEnv.getAuthorizationResult() );
  }

  list(ucEnv) {
    return ListAbl.list( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  get(ucEnv) {
    return GetAbl .get( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  delete(ucEnv) {
    return DeleteAbl.delete( ucEnv.getUri().getAwid(), ucEnv.getDtoIn() );
  }

  update(ucEnv) {
    return UpdateAbl.update( ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }
}

module.exports = new JokeController();

