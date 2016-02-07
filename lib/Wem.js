'use strict'

class Wem {
  constructor(o) {
    this.streamedAudio      = o["Streamed Audio"]
    this.ID                 = o["ID"]
    this.name               = o["Name"]
    this.audioSourceFile    = o["Audio source file"]
    this.generatedAudioFile = o["Generated audio file"]
    this.wwiseObjectPath    = o["Wwise Object Path"]
    this.notes              = o["Notes"]
  }
}
module.exports = Wem
