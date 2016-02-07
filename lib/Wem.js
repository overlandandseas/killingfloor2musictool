'use strict'
const targz = require('targz')
const fs = require('fs-extra')
const exec = require('child_process').exec
const rimraf = require('rimraf')

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

  replaceAudioSource(wav, wwiseUtiltiy, kfGame, cb) {
    const PROJECTTAR = `${path.dirname(__dirname)}\\assets\\Wwise_Template_Migration.tar.gz`
    const PROJECTDIR = `${path.dirname(__dirname)}\\assets\\WwiseProject`
    const targzOptions = {
      src: PROJECTTAR,
      dest: PROJECTDIR
    }
    //CALLBACK HELL

    //decompress the zipFiles
    targz.decompress(targzOptions, err => {
      if(err) throw err
      console.log("unzipped Template Project");

      //copy the wav file into the template project
      fs.copy(wav, `${PROJECTDIR}\\Wwise_Template\\Originals\\SFX\\song.wav`, err => {
        if(err) throw err
        console.log("Copied wav file into Template Project");

        //Run the CLI to convert the wav into a wem
        exec(`"${wwiseUtiltiy.PATH}" "${PROJECTDIR}\\Wwise_Template\\Template.wproj" -GenerateSoundBanks - Platform Windows`, {shell: 'cmd.exe'}, err => {
          if(err) throw err
          console.log("Convered wav file into a wem file");

          //copy new wem file into killing floor music
            fs.copy(`${PROJECTDIR}\\Wwise_Template\\.cache\\Windows\\SFX\\song_2C5DABC5.wem`, `${kfGame.PATH}\\${this.generatedAudioFile}`, err => {
              if(err) throw err
              console.log(`Replace ${this.name} with ${path.basename(wav)}.`);
              this.wav = wav

              //remove WwiseProject Template
              rimraf(PROJECTDIR, err => {
                if(err) throw err
                console.log("Removed templated project")

                //TODO save progress

                //callback
                cb(err)
              })
            })

        })
      })
    })
  }


}
module.exports = Wem
