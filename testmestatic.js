'use strict';

class Beer {

    constructor(inName) {
        this.name = inName;
    }

    static setAbv(num) {
        if(!set) this.abv = num;
        var set = true
    }

    static getAbv() {
        return this.abv;
    }

}


let antiHero = new Beer('Anti-hero');
// console.log(Beer.getAbv());
Beer.setAbv(5.7);
console.log(Beer.getAbv());
Beer.setAbv(4.2);
console.log(Beer.getAbv());
