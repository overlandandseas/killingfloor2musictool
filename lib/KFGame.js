'use strict'
const fs = require('fs')
const path = require('path')
const Wem = require('./Wem')


class KFGame {
  constructor() {
    this.wems = this.captureInitalData()
    this.PATH = this.findDefaultPath()
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
        fs.lstatSync("C:\\Program Files (x86)\\Steam\\steamapps\\commonNOT\\killingfloor2")
        return "C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2"
    } catch (err) {
      console.log(err)
      return null
    }
  }
  checkPath(checkMe) {
    let folderName = path.dirname(path.dirname(path.dirname(checkMe)))
    try {
      fs.lstatSync(`${folderName}\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)`)
      this.PATH = `${folderName}\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)`
      this.GAMEPATH = checkMe
    } catch (err) {
      window.alert("Cannot find Killing Floor 2 Folder. Please select KFGame.exe (usually located at <STEAMFOLDER>\steamapps\\common\\killingfloor2\\Binaries\\Win64)")
    }
  }
}


module.exports = KFGame
