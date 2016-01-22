'use strict';

//imports
const fs = require('fs');
const cp = require('child_process');
const rimraf = require('rimraf');
const Promse = require('bluebird');

const rimrafAsyc = Promise.promisify(rimraf);
const execAsync = Promise.promisify(exec);

Promise.promisifyAll(fs);

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

    //non-static methods
    toString() {
        return this.name;
    }

    isChanged() {
        return !!this.wavName;
    }

    //the big one (not at the moment)
    swapAudioSource(inName, inPath) {

        this.wavName = inName;
        //lets do this but BLOCK the fucking thread cause you are going to not want to do shit.
        fs.renameSync(inPath, `${__dirname}\\assets\\Wwise_Template_Migration\\Originals\\SFX\\song.wav`);
        //update progress bar
        cp.execSync(`${KfStreamedAudio.wwiseCliPath} ${__dirname}\\assets\\Wwise_Template_Migration\\Template.wproj -GenerateSoundBanks -Platform Windows`);
        //update progress bar
        fs.renameSync(`${__dirname}\\assets\\Wwise_Template_Migration\\.cache\\windowssong.wav`, `${KfStreamedAudio.pathToKf}\\Music\\${this.audioSourceFile}`);
        //update user

    }

}

module.exports = KfStreamedAudio;
