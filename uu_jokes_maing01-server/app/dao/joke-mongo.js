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
    return await super.findOne( { awid, id } );
  }

  async deleteById(awid, id) {
    return await super.deleteOne({ awid, id });
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

}

module.exports = JokeMongo;
