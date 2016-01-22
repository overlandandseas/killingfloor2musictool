//generate the dumb fucking thing

'use strict';

const rimraf = require('rimraf');
const fs = require('fs-extra');
const cp = require('child_process');
const tar = require('tar');

const wavPath = `${__dirname}\\${process.argv[2]}`;

console.log("Wave File", wavPath);

// var extractor = tar.Extract({ path: `${__dirname}\\assets`})
//     .on('error', onError)
//     .on('end', )

//ENTER THE CALLBACK HELL
rimraf(`${__dirname}\\Wwise_Template`, {}, () => {
    console.log('Removed all project template.');
    cp.exec(`tar -zxf "${__dirname}\\assets\\Wwise_Template_Migration.tar.gz"`, {shell: 'cmd.exe'}, (err)=> {
        if(err) {
            console.log("Errored on tar", err);
            return;
        }
        console.log("Tar Extracted");
        fs.copy(wavPath, `${__dirname}\\Wwise_Template\\Originals\\SFX\\song.wav`, (err) => {
            if(err) {
                console.log("Errored on fs.copy", err);
                return;
            }
            console.log("Wav File Renamed");
            cp.exec(`"C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe" "${__dirname}\\Wwise_Template\\Template.wproj" -GenerateSoundBanks -Platform Windows -Verbose`, {shell: 'cmd.exe'}, (err) => {
                if(err) {
                    console.log("Erroed on the last thing", err);
                    return;
                }
                console.log("File Created? song_2C5DABC5.wem");
            })
        });
    });
});
