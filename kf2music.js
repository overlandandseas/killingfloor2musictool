'use strict';
//JavaScript
var angular = require('angular'); //no babel so import does not work.
const fs = require('fs');
const Song = require('./Song'); //this was for demo data during prototyping
const KfStreamedAudio = require('./KfStreamedAudio');


angular.module('kf2Music', []).controller('kf2MusicController', function($scope) {
    $scope.title = "Killing Floor 2 Music Tool";
    // $scope.songs = Song.generateSongs([], 50);
    let songArr = JSON.parse(fs.readFileSync(__dirname + '/data/nah.json'));
    let validSongArr = JSON.parse(fs.readFileSync(__dirname + '/data/initialdata.json'));

    console.log(validSongArr);
    $scope.songs = KfStreamedAudio.generateSongsFromArray(validSongArr);

    KfStreamedAudio.setKfPath("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame");
    KfStreamedAudio.setWwiseCliPath("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe");

    $scope.killMe = function () {
        fs.writeFile('data/initalData.json', JSON.stringify(this.songs, null, 4), function () {
            $scope.h3Tag = "File Has been Saved";
        });
    };

    $scope.fileChanges = function (index, input) {
        console.log(input.files[0].path);
        $scope.songs[index].swapAudioSource(input.files[0].name, input.files[0].path);
        $scope.$apply();
    };

});
