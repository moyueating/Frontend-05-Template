function match(str){
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for(let c of str){
        if(c === 'a') {
            foundA = true;
        }else if(foundA && c === 'b'){
            foundA = false;
            foundB = true;
        }else if(foundB && c === 'c'){
            foundB = false;
            foundC = true;
        }else if(foundC && c === 'd'){
            foundC = false;
            foundD = true;
        }else if(foundD && c === 'e'){
            foundD = false
            foundE = true;
        }else if(foundE && c === 'f'){
            return true
        }else{
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
            foundF = false;
        }
    }
    return false;
}

console.log(match('I abcm gabcdeffroot'))