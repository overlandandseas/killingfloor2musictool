'use strict'

var angular = require('angular')
const path = require('path')
const fs = require('fs')
const KFGame = require('./lib/KFGame')
const WwiseUtilities = require('./lib/WwiseUtilities')

angular.module('projectDemonHunterHunter', []).controller('kf2MusicController', function ($scope) {
  // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Lexical_this

  let dataObj = checkForUpdatedFile()
  let kfGame = new KFGame(dataObj)
  let wwiser = new WwiseUtilities(dataObj)

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
        // writeNewFile()
      })

    } else {
      window.alert("Please select a WAV file!")
      return
    }
  }

  $scope.saveStatus = function() {
    writeNewFile()
  }

  function trimSongs(arr) {
    arr.forEach((currentValue, index) => {
      delete arr[index]["loading"]
      if(currentValue.wavName === '') delete arr[index].wavName
    })
    return arr
  }

  function writeNewFile() {
    let objToMakeString = {
      audioSources: trimSongs($scope.songs),
      kfPath: kfGame.PATH,
      kfGamePath: kfGame.GAMEPATH,
      wwPath: wwiser.PATH,
      wwExcePath: wwiser.EXEPATH
    }
    fs.writeFile(`${__dirname}\\data\\updated_data.json`, JSON.stringify(objToMakeString, null, 4), err => {
      if(err) throw err
      console.log("Saved updated version of data.");
    })
  }

  function checkForUpdatedFile() {
    try {
        if(fs.lstatSync(`${path.dirname(__dirname)}\\data\\updated_data.json`).isFile())
          return JSON.parse(fs.readFileSync(`${path.dirname(__dirname)}\\data\\updated_data.json`))
    } catch (err) {
        console.log(err)
        console.log('Using inital data');
        return JSON.parse(fs.readFileSync(`${__dirname}\\data\\initialdata.json`))
    }
    return JSON.parse(fs.readFileSync(`${path.dirname(__dirname)}\\data\\updated_data.json`))
  }

})
