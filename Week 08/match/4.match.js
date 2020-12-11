// 状态机处理 字符串中找到 abc

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
    return val === 'c' ? end : foundA(val);
}

function end(c){
    return end
}

console.log(match('I am aabc'))