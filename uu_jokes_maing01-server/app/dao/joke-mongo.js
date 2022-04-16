"use strict";
const {UuObjectDao} = require("uu_appg01_server").ObjectStore;

class JokeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
    await super.createIndex({ awid: 1, visibility: 1 });
  }

  async create(joke) {
    return await super.insertOne(joke);
  }

  async listByVisibility(awid, visibility, pageInfo = {}) {
    return await super.find({ awid, visibility }, pageInfo);
  }

  async getById(awid,id) {
    // todo - jak tohle funguje???
    return await super.find( { awid, id } );
  }

  async deleteById(awid, id) {
    return await super.deleteOne({ awid, id });
  }

}

module.exports = JokeMongo;
