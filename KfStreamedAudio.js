'use strict';

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
    }

}

module.exports = KfStreamedAudio;
