'use strict';
//JavaScript
var angular = require('angular'); //no babel so import does not work.
const fs = require('fs');
const Song = require('./Song.js')

angular.module('kf2Music', []).controller('kf2MusicController', function($scope) {
    $scope.title = "Killing Floor 2 Music Tool";
    $scope.songs = Song.generateSongs([], 50);

    $scope.songs[2].swapOutSong("bring_me_the_horizon_throne.wav");
    $scope.songs[5].swapOutSong("the_devil_wears_prada_danger_wildman.mp3");
    $scope.songs[20].swapOutSong("crown_the_empire_makeshift_chemistry.flac");

});
