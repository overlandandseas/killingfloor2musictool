'use strict'

var angular = require('angular')
const path = require('path')
const KFGame = require('./lib/KFGame')
const WwiseUtilities = require('./lib/WwiseUtilities')

angular.module('projectDemonHunterHunter', []).controller('kf2MusicController', function ($scope) {
  // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Lexical_this
  let kfGame = new KFGame()
  let wwiser = new WwiseUtilities()

  $scope.kfPath = kfGame.GAMEPATH
  $scope.songs = kfGame.wems
  $scope.wwPath = wwiser.EXEPATH

  $scope.getkfpath = function (input) {
    kfGame.checkPath(input.files[0].path)
    $scope.kfPath = kfGame.GAMEPATH ? `${path.dirname(kfGame.GAMEPATH)}\\KFGame.exe` : null
    $scope.$apply()
  }

  $scope.getwwpath = function (input) {
    wwiser.checkPath(input.files[0].path)
    $scope.wwPath = wwiser.EXEPATH ? `${path.dirname(wwiser.EXEPATH)}\\Wwise.exe` : null
    $scope.$apply()
  }
  $scope.fileChanges = function (index, input) {
    let wavPath = input.files[0].path
    if(path.extname(wavPath) === ".wav") {
      $scope.songs[index].loading = true
      $scope.$apply()

      $scope.songs[index].replaceAudioSource(wavPath, wwiser, kfGame, function (err) {
        if(err) throw err
        console.log("ALL DONE!")
        $scope.songs[index].loading = false
        $scope.songs[index].wavName = path.basename(wavPath)
        $scope.$apply()
      })

    } else {
      window.alert("Please select a WAV file")
      return
    }
  }

})
