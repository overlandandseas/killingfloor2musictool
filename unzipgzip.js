'use strict';

const fs = require('fs-extra');
const zlib = require('zlib');
const unzip = require('unzip');

// fs.readFile(`${__dirname}/assets/Wwise_Template_Migration.tar.gz`, (err, data) => {
//     if(err){
//         console.log("Error on readFile");
//         console.log(err);
//         return;
//     }
//     console.log("Completed readFile");
//     zlib.gunzip(data, {}, (err, data)=> {
//         if(err){
//             console.log("Error on gunzip");
//             console.log(err);
//             return;
//         }
//         console.log("Completed on gunzip");
//         fs.write(`${__dirname}/assets/wwiseStuff`, data, null, null, null, (err, written, buffer)=> {
//             if(err){
//                 console.log("Error on write");
//                 console.log(err);
//                 return;
//             }
//             console.log("Completed write", written);
//         });
//     });
// });

//fs.createReadStream('path/to/archive.zip').pipe(unzip.Extract({ path: 'output/path' }));

//
fs.createReadStream(`${__dirname}/assets2/Wwise_Template_zip_me.zp`).pipe(unzip.Extract({ path: `${__dirname}/assets2/wwisedata/` }).on('close', (err) => {
    if(err) console.log("Error", err);
    console.log("done", "FUCK A CALLBACK");
}));
