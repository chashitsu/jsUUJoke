"use strict";

const ErrorBase = require("./jokes-main-use-case-error.js");

const Create = {
    UC_CODE: `${ErrorBase.JOKES_MAIN_ERROR_PREFIX}joke/create/`,

    InvalidDtoIn: class extends ErrorBase {
      constructor() {
        super(...arguments);
        this.code = `${Create.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    }

  };
const List = {
  UC_CODE: `${ErrorBase.ERROR_PREFIX}joke/list/`,

  InvalidDtoIn: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Get = {
  UC_CODE: `${ErrorBase.ERROR_PREFIX}joke/get/`,

  InvalidDtoIn: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokesDoesNotExist: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokesDoesNotExist`;
      this.message = "UuObject jokes does not exist.";
    }
  },
};

const Delete = {
  UC_CODE: `${ErrorBase.ERROR_PREFIX}joke/delete/`,

  InvalidDtoIn: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Update = {
  UC_CODE: `${ErrorBase.ERROR_PREFIX}joke/update/`,

  InvalidDtoIn: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokesDoesNotExist: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokesDoesNotExist`;
      this.message = "UuObject jokes does not exist.";
    }
  },
  UserNotAuthorized: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  TextCannotBeRemoved: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}textCannotBeRemoved`;
      this.message = "Text cannot be removed if joke would end up without both text and image.";
    }
  },
  JokeDaoUpdateFailed: class extends ErrorBase {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokeDaoUpdateFailed`;
      this.message = "Update joke by joke Dao update failed.";
    }
  }


};

  module.exports = {
    Create,
    List,
    Get,
    Delete,
    Update
  };
