'use strict'

var angular = require('angular')
const path = require('path')
const KFGame = require('./lib/KFGame')

angular.module('projectDemonHunterHunter', []).controller('kf2MusicController', function ($scope) {
  // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Lexical_this
  let kfGame = new KFGame()

  $scope.kfPath = kfGame.PATH
  $scope.songs = kfGame.wems

  $scope.getkfpath = function (input) {
    kfGame.checkPath(input.files[0].path)
    $scope.kfPath = `${path.dirname(kfGame.GAMEPATH)}\\KFGame.exe`
    $scope.$apply()
  }
})
