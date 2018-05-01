var loki = require("lokijs")

class accountStore {
  constructor(dbFileName, callback){
    var self = this
    // implement the autoloadback referenced in loki constructor

    var databaseInitialize = function() {
      self.accounts = self.db.getCollection("accounts");
      if ( self.accounts === null) {
        self.accounts = self.db.addCollection("accounts");
      }
      callback()
    }

    this.db = new loki(dbFileName, {
      autoload: true,
      autoloadCallback: databaseInitialize,
      autosave: true,
      autosaveInterval: 4000
    });

  }
  insert(params) {
    var result = this.accounts.insert(params)
    this.db.saveDatabase()
    return result
  }

  update(params) {
    var result = this.accounts.update(params)
    this.db.saveDatabase()
    return result
  }

  find(query) {
    return this.accounts.find(query)
  }

  findOnly(query) {
    var result = this.accounts.find(query)

    if(result.length !== 1) {
      console.log('[Error] more/less than one accounts are found:', result.length)
      return undefined
    }

    return result[0]
  }
  all() {
    return this.accounts.find({})
  }

  remove(object) {
    return this.accounts.remove(object)
  }
}

module.exports = accountStore
