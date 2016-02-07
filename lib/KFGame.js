'use strict'
const fs = require('fs')
const path = require('path')
const Wem = require('./Wem')


class KFGame {
  constructor() {
    this.wems = this.captureInitalData()
    this.findDefaultPath()
  }

  captureInitalData() {
    let wems = []
    let dataArr
    //check if data comes from another source
    try {
        fs.lstatSync(`${path.dirname(__dirname)}\\data\\modifieddata.json`)
        dataArr = JSON.parse(fs.readFileSync(`${path.dirname(__dirname)}\\data\\modifieddata.json`))
      // else
      //   dataArr = JSON.parse(fs.readFileSync(__dirname.substr(0, __dirname.length - 4) + '../data/initialdata.json'))
    } catch (err) {
        console.log(err)
        console.log('Using inital data');
        dataArr = JSON.parse(fs.readFileSync(`${__dirname.substr(0, __dirname.length - 4)}\\data\\initialdata.json`))
    }
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
    this.PATH = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)`"
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
