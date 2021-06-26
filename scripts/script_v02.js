'use strict';

//const prompt = require('prompt-sync')({sigint: true});

//Apple Banana Cherry Diamond

const a="Apple"
const b="Banana"
const c="Cherry"
const d="Diamond"

const reel1=[a,b,c,d,a,d,c,b,a,a]
const reel2=[a,b,c,d,a,d,c,b,a,a]
const reel3=[a,b,c,d,a,d,c,b,a,a]

let money = 100
let reel1y = 0
//let started=process.hrtime() //returns a [seconds][nanoseconds] tuple

let costPerSpin = 10

//while (money>costPerSpin){  //the main loop
function spinReels(){

    console.log('You have £' + money )
   // prompt('Press enter to spin the wheels')  

    money = money - costPerSpin //Pay £1 to play
    //scroll()
    setTimeout(scroll,10) //to execute a function after waiting for the specified time interval
    
    let p1 = Math.floor(Math.random() * 10) //where a reel stops
    let p2 = Math.floor(Math.random() * 10)
    let p3 = Math.floor(Math.random() * 10)

    console.log(reel1[p1] + ' ' + reel2[p2] + ' ' + reel3[p3])

    if (checkReelsMatch(p1,p2,p3)){

        console.log ('You win :o)')
        if (reel1[p1]=='Apple'){
            money = money + 2
            console.log ('£2')
        }
        else if (reel1[p1]=='Banana') {
            money = money + 3
            console.log ('£3')
        }
        else if (reel1[p1]=='Cherry') {
            money = money + 5
            console.log ('£5')
        }
        else if (reel1[p1]=='Diamond') {
            money = money + 20
            console.log ('£20')
        }      
    }
    else(
        console.log('You lose :o(')
    )
}

//console.log ("You are out of money - gambling is a foools game")

//let took=process.hrtime(started)
//console.log (took[0] + "seconds and " + took[1] /1e6 + "milliseconds")

function checkReelsMatch(p1,p2,p3){

    if (check3theSame(p1,p2,p3)){
        return true
    }

}

function check3theSame(a,b,c){

    if(a==b && b==c){
        return true
    }
}

function scroll() {
    let reels = document.getElementsByClassName("reel")
    reels[0].scrollTop = reel1y
    reel1y += 10
    setTimeout(scroll,10)
    if (reel1y > 100) {
        reel1y = 0;
      }
}
