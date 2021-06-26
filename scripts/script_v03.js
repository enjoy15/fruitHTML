'use strict';

//const prompt = require('prompt-sync')({sigint: true});

//Apple Banana Cherry Diamond

// class Reel{
//     constructor(position){
//         this.position = position;
//     }
//     spin(){

//     }
// }

// let fruits = ['Apple','Banana', 'Cherry','Diamond']
// let reels = [];
// for (let i=0;i<3;i++){
//    // for (let j=0;j<10;j++){
//        reels.push(fruits[i]);
//     }

//Apple Banana Cherry Diamond

const distinctFruits=[] 

distinctFruits.push({name:'apple',toProbability:.23,prize:2,symbol:'🍎'})       //23%
distinctFruits.push({name:'banana',toProbability:.43,prize:4,symbol:'🍌'})      //20%
distinctFruits.push({name:'cherry',toProbability:.58,prize:6,symbol:'🍒'})      //15%
distinctFruits.push({name:'grapes',toProbability:.7,prize:10,symbol:'🍇'})       //12%
distinctFruits.push({name:'melon',toProbability:.81,prize:12,symbol:'🍈' })       //11%
distinctFruits.push({name:'pineapple',toProbability:.91,prize:18,symbol:'🍍'})   //10%
distinctFruits.push({name:'mango',toProbability:1,prize:25,symbol:'🥭'})       //9%

const reels=[] //an array of reels - each *element* will contain an *array* of distinctFruit indices (just numbers)

const numReels=3
const reelLength=10
const reelDivs=document.getElementsByClassName("reel")
let fruitHeight = 0 //This is approximate. We will work it out correctly with code.

for (let i=0;i<numReels;i++){
    let reel = buildReel(distinctFruits,reelLength) //build reel
    reels.push(reel) //push reel in array go through every f to creat html
    reel.forEach(f => { 
        reelDivs[i].innerHTML += distinctFruits[f].symbol
    }) 
    fruitHeight = reelDivs[0].scrollHeight/reelLength
    // Duplicating friuts so that we can scroll to the very end.
    reel.forEach(f => {  
        reelDivs[i].innerHTML += distinctFruits[f].symbol
    }) 
    
}
function buildReel(fruits,length){
    //accepts an array of distinct fruits 
    //returns an array of length elements of random fruit indices

    let reel=[]
    for (let i=0;i<length;i++){
        let chosenFruit = Math.floor(Math.random() * fruits.length) 
        reel.push(chosenFruit)
    }    

    return reel

}


let money = 100

//let started=process.hrtime() //returns a [seconds][nanoseconds] tuple

let costPerSpin = 10


function spinReels(){

        console.log('You have £' + money )
        // prompt('Press enter to spin the wheels')  

        //console.log(fruits[1]);

        money = money - costPerSpin //Pay £1 to play
        //scroll()
        //setTimeout(scroll,10) //to execute a function after waiting for the specified time interval
        animate () // start the reel in motion.
        //where a reel stops
        let target = []
        target.push(Math.floor(Math.random() * reelLength))
        target.push(Math.floor(Math.random() * reelLength))
        target.push(Math.floor(Math.random() * reelLength))

        // let p1 = Math.floor(Math.random() * reelLength) 
        // let p2 = Math.floor(Math.random() * reelLength)
        // let p3 = Math.floor(Math.random() * reelLength)

        // console.log(reel1[p1] + ' ' + reel2[p2] + ' ' + reel3[p3])

        // if (checkReelsMatch(p1,p2,p3)){

        //     console.log ('You win :o)')
        //     if (reel1[p1]=='Apple'){
        //         money = money + 2
        //         console.log ('£2')
        //     }
        //     else if (reel1[p1]=='Banana') {
        //         money = money + 3
        //         console.log ('£3')
        //     }
        //     else if (reel1[p1]=='Cherry') {
        //         money = money + 5
        //         console.log ('£5')
        //     }
        //     else if (reel1[p1]=='Diamond') {
        //         money = money + 20
        //         console.log ('£20')
        //     }      
        // }
        // else{
        //     console.log('You lose :o(')
        // }
    
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

let reelf = [0,0,0]

function animate() {
    let reels = document.getElementsByClassName("reel")

    // reelf.forEach (f => {
    //     f+= 0.1

    // })
    // reels.forEach (r =>{ // push reel variable
    //     r.scrollTop = reelf * fruitHeight /2
    // })
    for (let i = 0; i < numReels; i++) {
        //check if the reel spinning, spinning parameter
        reelf[i] += 0.1
        reels[i].scrollTop = reelf[i] * fruitHeight /2
        if (reelf[i] > reelLength) {
            reelf[i] = 0;
          }
        
        // stop each reel when it reaches the target
        // if (Math.floor(reelf[i]) === target[i]) {
        //     //stop reel
 
        // }


    }

   // console.log(reel1f)

    requestAnimationFrame (animate)
}

