'use strict';

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
let spin = [false,false,false]; //boolean whether to spin a reel

for (let i=0;i<numReels;i++){
    let reel = buildReel(distinctFruits,reelLength) //build reel
    reels.push(reel) 
    //push reel in array go through every f to create html
    reel.forEach(f => { 
        reelDivs[i].innerHTML += distinctFruits[f].symbol
    }) 
    fruitHeight = Math.floor(reelDivs[0].scrollHeight/reelLength) //calculate fruit height in pixels = 63 pixels
    // Repeat the forEach again to duplicate friuts so that we can scroll to the very end. We are doubling the reel lenth
    reel.forEach(f => {  
        reelDivs[i].innerHTML += distinctFruits[f].symbol
    }) 
}

//Function to pick random fruits for build reel
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
let money = document.querySelector('#money').textContent //get money from id 'money' in index.html

let costPerSpin = 1
let target = []
let reelf = [0,0,0]

animate () // start the reel in motion

function spinReels(){
        if (money < costPerSpin) {
            alert("You are out of money - gambling is a foools game") //alert if run out of money
        }
        else {
        money = money - costPerSpin //Pay costPerSpin to play
        console.log('You have £' + money )
        moneyObj.textContent = money //update money on page

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
        console.log(win[0].name, win[1].name, win[2].name)
        //if all reels 1- 3 get to same fruit, add prize money to money
        if (checkReelsMatch(win[0].name,win[1].name,win[2].name)){
            money += win[0].prize
        }
        }
}
// check if all 3 reel gets the same fruit
function checkReelsMatch(p1,p2,p3){

    if (check3theSame(p1,p2,p3)){
        return true
    }
}
//check a = b && b =c
function check3theSame(a,b,c){

    if(a==b && b==c){
        return true
    }
}
// start the reel in motion
function animate() {
    let reels = document.getElementsByClassName("reel")
    // i = number of Reels 
    for (let i = 0; i < numReels; i++) {
        //check if the reel spinning, spinning parameter
        //reelf = fruit number
        if(spin[i]) { 
            reelf[i] += 0.1
            reels[i].scrollTop = (reelf[i]-1) * fruitHeight / 2 //fruitHeight is divided by 2 as the reel is twice as long. The reel is twice as long as we duplicate friuts so that we can scroll to the very end. 
            //Use (reelf[i]-1) to offset to the middle row. Otherwise it will be the top row.
            if ((reelf[i]) > reelLength) { //if reel frame > reel length set it to 0 and keep rolling
                reelf[i] = 0; 
            }    
        }
        //stop each reel when it reaches the target. If it is the first reel stop but if it is reel 2 or 3 check whether the previous reel has stopped
        //reelf[i] is the top line. Check whether the top line match target -1
        //if target = 0 then set (target -1) = reel length -1
        if ((Math.floor(reelf[i]) === target[i]) && (i == 0 || spin[i-1] == false)) {
            //stop reel
            spin[i] = false; //true = wheel is spinning, false = reel is stop.
        }
    }
   requestAnimationFrame (animate)
}

