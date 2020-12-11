// 状态机处理 字符串中找到 abcabx

function match(string){
    let state = foundA
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}

function foundA(val){
    return val === 'a' ? foundB : foundA;
}

function foundB(val){
    return val === 'b' ? foundC : foundA(val);
}

function foundC(val){
    return val === 'c' ? foundA2 : foundA(val);
}

function foundA2(val){
    return val === 'a' ? foundB2 : foundA(val);
}

function foundB2(val){
    return val === 'b' ? foundX : foundA(val);
}

function foundX(val){
    return val === 'x' ? end : foundC(val)
}

function end(c){
    return end
}

console.log(match('abcabcabx'))