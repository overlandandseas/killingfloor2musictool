'use strict';

class Song {
    constructor(inTitle, inArtist, inFilename) {
        this.title = inTitle;
        this.artist = inArtist;
        this.fileName = inFilename;
        this.initalSize = 1000000;
    }

    //staic methods

    //private methods
    static _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //public methods
    static generateSongs(arr, num) {
        for (let c = 0; c < num; c++) {
            arr.push(Song.randomSong());
        }
        return arr;
    }

    static randomSong() {
        return new Song ("Song Title" + this._getRandomInt(0, 10), "DH_" + this._getRandomInt(0, 20), this._getRandomInt(0, 99999) + ".wem");
    }

    //whatever
    toString() {
        return this.artist + " - " + this.title;
    }

    swapOutSong(songTitle) {
        this.currentSize = 500000;
        this.wavName = songTitle; //or whatever it is.
    }

    isChanged() {
        return this.currentSize && this.currentSize !== this.initalSize;
    }

}

module.exports = Song;
