'use strict';

//const prompt = require('prompt-sync')({sigint: true});

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
let spin = [false,false,false];

for (let i=0;i<numReels;i++){
    let reel = buildReel(distinctFruits,reelLength) //build reel
    reels.push(reel) //push reel in array go through every f to creat html
    reel.forEach(f => { 
        reelDivs[i].innerHTML += distinctFruits[f].symbol
    }) 
    fruitHeight = Math.floor(reelDivs[0].scrollHeight/reelLength)
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

let moneyObj = document.querySelector('#money')
let money = document.querySelector('#money').textContent
//let started=process.hrtime() //returns a [seconds][nanoseconds] tuple
let costPerSpin = 20
let target = []
let reelf = [0,0,0]

animate () // start the reel in motion

function spinReels(){
        if (money < costPerSpin) {
            alert("You are out of money - gambling is a foools game")
        }
        else {
        money = money - costPerSpin //Pay £1 to play
        console.log('You have £' + money )
        moneyObj.textContent = money //update money on page
        // prompt('Press enter to spin the wheels')  

        //console.log(fruits[1]);

        //scroll()
        //setTimeout(scroll,10) //to execute a function after waiting for the specified time interval

        spin = [true, true, true]
        //target = where a reel stops
        target[0]= (Math.floor(Math.random() * reelLength)) 
        target[1]= (Math.floor(Math.random() * reelLength)) 
        target[2]= (Math.floor(Math.random() * reelLength))

        let win = [] // This will contain the fruits on the win line.
        //distinctFruits.push({name:'apple',toProbability:.23,prize:2,symbol:'🍎'})       
        win[0] = distinctFruits[reels[0][target[0]]]
        win[1] = distinctFruits[reels[1][target[1]]]
        win[2] = distinctFruits[reels[2][target[2]]]
        console.log(win[0])
        console.log(win[1])
        console.log(win[2])
        //if (win[0].name = "apple") {
        if (checkReelsMatch(win[0].name,win[1].name,win[2].name)){
            money += win[0].prize
        }
        }
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



function animate() {
    let reels = document.getElementsByClassName("reel")
    // reelf.forEach (f => {
    //     f+= 0.1

    // })
    // reels.forEach (r =>{ // push reel variable
    //     r.scrollTop = reelf * fruitHeight /2
    // })
    // i = number of Reels 
    for (let i = 0; i < numReels; i++) {
        //check if the reel spinning, spinning parameter
        //reelf = fruit number
        if(spin[i]) { 
            reelf[i] += 0.1
            reels[i].scrollTop = reelf[i] * fruitHeight / 2
            if (reelf[i] > reelLength) { //if reel frame > reel length set it to 0 and keep rolling
                reelf[i] = 0; 
            }    
        }
        //stop each reel when it reaches the target. If it is the first reel stop but if it is reel 2 or 3 check whether the previous reel has stopped
        //reelf[i] is the top line. Check whether the top line match target -1
        //if target = 0 then set (target -1) = reel length -1
        if ((Math.floor(reelf[i]) === target[i]) && (i == 0 || spin[i-1] == false)) {
            //stop reel
            //reels[i].scrollTop = target[i] * fruitHeight /2
            spin[i] = false; //true = wheel is spinning, false = reel is stop.
        }
    }

   // console.log(reel1f)
   requestAnimationFrame (animate)

}

