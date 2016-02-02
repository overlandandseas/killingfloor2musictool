'use strict';

//imports
const fs = require('fs');
const cp = require('child_process');
const rimraf = require('rimraf');
const targz = require('targz');

class KfStreamedAudio {

  constructor(inId, inName, inAudoSourceFile, inGeneratedAudioFile, inWiseObjectPath, inNotes) {
    this.id = inId;
    this.name = inName;
    this.audioSourceFile = inAudoSourceFile;

    //probably won't need anything past this but might as well if it's free.
    this.generatedAudioFile = inGeneratedAudioFile;
    this.wiseObjectPath = inWiseObjectPath;
    this.notes = inNotes;
  }

  //static methods

  //create from JSON array
  static generateSongsFromArray(inArr) {
    let kfArr = [];

    for(let index in inArr) {
      kfArr.push(this.object2KfStreamAudio(inArr[index]));
    }
    return kfArr;
  }

  //create KfStreamedAduio from object
  static object2KfStreamAudio(inObj) {
    return new KfStreamedAudio(inObj["ID"], inObj["Name"], inObj["Audio source file"], inObj["Generated audio file"], inObj["Wwise Object Path"], inObj["Notes"]);
  }

  //setter for static data member wwiseCliPath
  static setWwiseCliPath(pathName) {
    this.wwiseCliPath = pathName;
  }
  static getWwiseCliPath() {
    return this.wwiseCliPath;
  }

  static setKfPath(pathName) {
    this.kfPath = pathName;
  }
  static getKfPath() {
    return this.kfPath;
  }

  static searchForDefaultKfPath() {
    if(fs.statSync("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame").isDirectory()) {
      this.setKfPath("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame\\BrewedPC\\WwiseAudio\\Windows\\English(US)")
      return true
    } else {
      return false
    }
  }

  static searchForDefaultWwisePath() {
    if(fs.statSync("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe").isFile()) {
      this.setWwiseCliPath("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe")
      return true
    } else {
      return false
    }
  }

  //@TODO make sure this is actually working.

  //private methods
  static _unzipWwiseTemplate(cb) {

  }

  //non-static methods
  toString() {
    return this.name;
  }

  isChanged() {
    return !!this.wavName;
  }


  //the big one (not at the moment)
  swapAudioSource(inName, inPath) {
    //@TODO Everything...
  }

}

module.exports = KfStreamedAudio;
