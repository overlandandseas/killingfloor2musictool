'use strict';

//imports
const fs = require('fs-extra');
const exec = require('child_process').exec;
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

  //create KfStreamedAudio from object
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
    try {
      if(fs.lstatSync("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2").isDirectory()) {
        this.setKfPath("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2")
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }

  static searchForDefaultWwisePath() {
    if(fs.lstatSync("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe").isFile()) {
      this.setWwiseCliPath("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe")
      return true
    } else {
      return false
    }
  }

  //non-static methods
  toString() {
    return this.name;
  }

  isChanged() {
    return !!this.wavName;
  }


  //the big one (not at the moment)
  swapAudioSource(inPath, cb) {
    //@TODO Everything...
    //ENTER THE CALLBACK HELL
    targz.decompress({
      src: `${__dirname}\\assets\\Wwise_Template_Migration.tar.gz`,
      dest: `${__dirname}\\assets\\WwiseProject`}, err => {
        if(err) throw err
        console.log('unzipped tar file')
        fs.copy(inPath, `${__dirname}\\assets\\WwiseProject\\WWise_Template\\Originals\\SFX\\song.wav`, err => {
          if(err) throw err
          console.log("Song copied into correct path")
          exec(`"${KfStreamedAudio.getWwiseCliPath()}" "${__dirname}\\assets\\WwiseProject\\WWise_Template\\Template.wproj" -GenerateSoundBanks -Platform Windows -Verbose`, {shell: 'cmd.exe'}, err => {
            if(err) throw err
            console.log("Execued Correct WWise command")
            fs.copy(`${__dirname}\\assets\\WwiseProject\\Wwise_Template\\.cache\\Windows\\SFX\\song_2C5DABC5.wem`, `${KfStreamedAudio.getKfPath()}\\BrewedPC\\WwiseAudio\\Windows\\${this.generatedAudioFile}`, err => {
              console.log("REMOVED your song file and replaced it with the one you wanted");
              this.wavName = inPath
              rimraf(`${__dirname}\\assets\\WiseProject`, err => {
                if(err) throw err
                cb(false)
              })
            })
          })
        })
      })




    }

  }

  module.exports = KfStreamedAudio;
