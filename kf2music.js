//JavaScript
var angular = require('angular');
var fs = require('fs');
var Song = function(inTitle, inArtist, inFilename ) {
    this.title = inTitle;
    this.artist = inArtist;
    this.fileName = inFilename; //wemcode
    // this.path = inPath;
};

Song.prototype.toString = function () {
    return this.artist + " - " + this.title;
};

Song.randomSong = function() {
    return new Song ("Song Title" + getRandomInt(0, 10), "DH_" + getRandomInt(0, 20), getRandomInt(0, 99999) + ".wem");
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function giveData(arr, num) {
    for (var c = 0; c < num; c++) {
        arr.push(Song.randomSong());
    }
    return arr;
}


angular.module('kf2Music', []).controller('kf2MusicController', function($scope) {
    $scope.title = "Killing Floor 2 Music Tool";

    $scope.songs = giveData([], 50);
});
