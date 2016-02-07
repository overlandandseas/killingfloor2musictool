'use strict'

const fs = require('fs')
const path = require('fs')

class WwiseUtilities {
  constructor() {
    findDefaultPath()
  }

  findDefaultPath() {
    let tryDefault = "C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\Wwise.exe"
    try {
      fs.lstatsSync(tryDefault)
    } catch(err) {
      console.log("Cannot Find wwise installation.");
      return
    }
    this.EXEPATH = tryDefault
    this.PATH = `${path.dirname(tryDefault)}\\WwiseCLI.exe`
  }

  checkPath(checkMe) {
    let tryCLI = `${path.dirname(checkMe)}\\WwiseCLI.exe`
    try {
      fs.lstatsSync(tryCLI)
    } catch (err) {
      console.log("Cannot find wwise executable");
    }

  }

}


module.exports = WwiseUtilities
