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
  }
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
  }
};

  module.exports = {
    Create,
    List,
    Get,
    Delete,
    Update
  };
