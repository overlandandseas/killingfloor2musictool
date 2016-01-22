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
    // $scope.songs = Song.generateSongsFromArray(songArr);
    $scope.songs = KfStreamedAudio.generateSongsFromArray(validSongArr);
    $scope.h3Tag = "GENERATE TEH JASONS";


    // $scope.songs[2].swapOutSong("bring_me_the_horizon_throne.wav");
    // $scope.songs[5].swapOutSong("the_devil_wears_prada_danger_wildman.mp3");
    // $scope.songs[20].swapOutSong("crown_the_empire_makeshift_chemistry.flac");

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
