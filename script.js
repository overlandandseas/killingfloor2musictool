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

  $scope.getwwpath(input) {
    wwiser.checkPath(input.files[0].path)
    $scope.wwPath = wwise.EXEPATH ? `${path.dirname(wwiser.EXEPATH)}\\Wwise.exe` : null
    $scope.$apply()
  }

})
