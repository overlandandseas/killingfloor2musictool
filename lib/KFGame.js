'use strict'
const fs = require('fs')
const path = require('path')
const Wem = require('./Wem')


class KFGame {
  constructor(inObj) {
    this.PATH = ''
    this.GAMEPATH = ''
    this.wems = this.captureInitalData(inObj.audioSources)
    this.checkPath(inObj.kfGamePath)
  }

  captureInitalData(inObj) {
    let wems = []
    let dataArr = inObj
    //check if data comes from another source
    dataArr.forEach(currentValue => {
      wems.push(new Wem(currentValue))
    })
    return wems
  }

  findDefaultPath() {
    try {
        fs.lstatSync("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\Binaries\\Win64\\KFGame.exe")

    } catch (err) {
      console.log(err)
      return
    }
    this.PATH = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)"
    this.GAMEPATH = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\Binaries\\Win64\\KFGame.exe"
  }



  checkPath(checkMe) {
    let folderName = path.dirname(path.dirname(path.dirname(checkMe)))
    try {
      fs.lstatSync(`${folderName}\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)`)
      this.PATH = `${folderName}\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)`
    } catch (err) {
      window.alert("Cannot find Killing Floor 2 Folder. Please select KFGame.exe (usually located at <STEAMFOLDER>\steamapps\\common\\killingfloor2\\Binaries\\Win64)")
      return
    }
    this.GAMEPATH = checkMe

  }
}


module.exports = KFGame
