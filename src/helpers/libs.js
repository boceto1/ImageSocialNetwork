const helpers = {}
const lengOfName = 6;

helpers.randomName = () =>{

    const possible = 'abcdefghijklmnorpqurstuvwxyz012345689';
    let randomName ="";

    for(let i=0; i<lengOfName;i++){
        randomName+= possible.charAt(Math.floor(Math.random()*possible.length));
    }

    return randomName;
}

module.exports = helpers;