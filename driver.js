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
    let wavePath = input.files[0].path
    if(path.extname(wavePath) === wem) {

    } else {
      window.alert("Please select a wave file")
      return
    }
  }

})
