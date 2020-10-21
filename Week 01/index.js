let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
let color = 1;
show(pattern)




function show(pattern){
    const board = document.querySelector('#board');
    board.innerHTML = '';
    for(let i =0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('div')
            cell.classList.add('cell');
            cell.innerText = pattern[i][j] === 2 ? '❌' : pattern[i][j] === 1 ? '⭕' : '';
            cell.addEventListener('click', () => {
                move(i, j)
            });
            board.appendChild(cell)
        }
        board.appendChild(document.createElement('br'))
    }
}

function move(x, y){
    if(pattern[x][y]) return;
    pattern[x][y] = color;
    if(check(pattern, color)){
        console.log(color === 2 ? '❌ is winner' : '⭕ is winner')
    }
    color = 3 - color;
    // 查看下一回合对手的情况
    console.log(`${color === 2 ? '❌' : '⭕'}的最好选择结果`, bestChoice(pattern, color))
    show(pattern);
    if(willWin(pattern, color)){
        console.log(color === 2 ? '❌ will win' : '⭕ will win')
    }
}

function check(pattern, color){
    // 行判断
    for(let i = 0; i < 3; i++){
        let win = true;
        for(let j = 0; j < 3; j++){
            if(pattern[i][j] !== color){
                win = false
            }
        }
        if(win) return true;
    }
    
    // 列判断
    for(let i = 0; i < 3; i++){
        let win = true;
        for(let j = 0; j < 3; j++){
            if(pattern[j][i] !== color){
                win = false
            }
        }
        if(win) return true;
    }

    // 左斜向判断
    {
        let win = true;
        for(let i = 0; i < 3; i++){
            if(pattern[i][2-i] !== color){
                win = false
            }
        }
        if(win) return true;
    }

    // 右斜向判断
    {
        let win = true;
        for(let i = 0; i < 3; i++){
            if(pattern[i][i] !== color){
                win = false
            }
        }
        if(win) return true;
    }

    return false;
}

function clone(pattern){
    return JSON.parse(JSON.stringify(pattern))
}

function willWin(pattern, color){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(pattern[i][j]) continue;
            let temp = clone(pattern)
            temp[i][j] = color;
            if(check(temp, color)){
                return [i, j]
            }
        }
    }
    return null;
}

function bestChoice(pattern, color){
    let p;
    if(p = willWin(pattern, color)){
        return {
            point: p,
            result: 1,
        }
    }
    let result = -1;
    let point = null;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(pattern[i][j]) continue;
            let temp = clone(pattern);
            temp[i][j] = color;
            // 对手的最好选择
            let r = bestChoice(temp, 3 - color).result;
            if(-r > result){
                result = -r;
                point = [i, j]
            }
        }
    }

    return {
        point,
        result: point ? result : 0,
    }
}

