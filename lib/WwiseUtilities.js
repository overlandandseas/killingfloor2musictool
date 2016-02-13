'use strict'

const fs = require('fs')
const path = require('path')

class WwiseUtilities {
  constructor(inObj) {
    this.checkPath(inObj.wwExcePath)
  }

  findDefaultPath() {
    let tryDefault = "C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\Wwise.exe"
    try {
      fs.lstatSync(tryDefault)
    } catch(err) {
      console.log("Cannot Find wwise installation.", err.message);
      return
    }
    this.EXEPATH = tryDefault
    this.PATH = `${path.dirname(tryDefault)}\\WwiseCLI.exe`
  }

  checkPath(checkMe) {
    let tryCLI = `${path.dirname(checkMe)}\\WwiseCLI.exe`
    try {
      fs.lstatSync(tryCLI)
    } catch (err) {
      console.log("Cannot find wwise executable", err.message);
      window.alert("Cannot find installation of Wwise Authoring Tools. ( It is usually located in C:\\Program Files (x86)\\Audiokinetic\\<WWISE VERSION>\\Authoring\\x64\\Release\\bin)")
      return
    }
    this.PATH = tryCLI
    this.EXEPATH = checkMe
  }

}


module.exports = WwiseUtilities
