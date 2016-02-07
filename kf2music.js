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


  $scope.kfPathFound = KfStreamedAudio.searchForDefaultKfPath()
  $scope.wwisePathFound = KfStreamedAudio.searchForDefaultWwisePath()
  $scope.kfPath = KfStreamedAudio.getKfPath()
  $scope.wwisePath = KfStreamedAudio.getWwiseCliPath()


  console.log(validSongArr);
  $scope.songs = KfStreamedAudio.generateSongsFromArray(validSongArr);

  // KfStreamedAudio.setKfPath("C:\\Program Files (x86)\\Steam\\steamapps\\common\\killingfloor2\\KFGame");
  // KfStreamedAudio.setWwiseCliPath("C:\\Program Files (x86)\\Audiokinetic\\Wwise v2015.1.4 build 5497\\Authoring\\Win32\\Release\\bin\\WwiseCLI.exe");


/*
 * Don't run this TONOTDO this
 */
  // $scope.killMe = function () {
  //   fs.writeFile('data/initalData.json', JSON.stringify(this.songs, null, 4), function () {
  //     $scope.h3Tag = "File Has been Saved";
  //   });
  // };

  $scope.fileChanges = function (index, input) {
    console.log(input.files[0].path);
    $scope.songs[index].swapAudioSource(input.files[0].path, err => {
      $scope.$apply();
    });

  };
  $scope.defineKillingFloor = function (input) {
    KfStreamedAudio.setKfPath(input.files[0].path.substr(0,59))
    $scope.kfPathFound = true
    $scope.kfPath = input.files[0].path.substr(0,59)
    $scope.$apply()
  }

});
