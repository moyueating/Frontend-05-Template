let map = localStorage['map'] ? JSON.parse(localStorage['map']) : new Array(10000).fill(0);

let container = document.getElementById('container');

for(let y = 0; y < 100; y++){
    for(let x = 0; x < 100; x++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        
        if(map[100 * y + x] === 1){
            cell.style.backgroundColor = 'black';
        }

        cell.addEventListener('mousemove',() => {
            if(mousedown){
                if(clear){
                    // 右键清除逻辑
                    cell.style.backgroundColor = '';
                    map[100 * y + x] = 0
                }else{
                    // 移动覆盖过的格子变黑色
                    cell.style.backgroundColor = 'black';
                    map[100 * y + x] = 1
                }
            }
        })

        container.appendChild(cell);
    }
}

let mousedown = false;
let clear = false;

document.addEventListener('mousedown', e => {
    mousedown = true;
    clear = (e.which === 3);
})
document.addEventListener('mouseup', () => {
    mousedown = false;
})
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})

function sleep(time){
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


async function findPath(map, start, end){
    let table = Object.create(map)
    var queue = [start];

    async function insert(x, y, pre){
        // 处理边缘场景
        if(x < 0 || x >= 100 || y < 0 || y >= 100) return;

        // 已经有值，表示是黑色块，路不通
        if(table[x * 100 + y]) return;

        await sleep(5);
        container.children[x * 100 + y].style.backgroundColor = 'lightgreen';
        table[x * 100 + y] = pre
        queue.push([x, y])
    }

    while(queue.length){
        let [x, y] = queue.shift();
        // console.log(x, y)
        if(x === end[0] && y === end[1]){
            let path = [];
            while(x !== start[0] || y !== start[1]){
                path.push(map[x * 100 + y]);
                [x, y] = table[x * 100 + y];
                await sleep(30);
                container.children[x * 100 + y].style.backgroundColor = 'pink'
            }
            console.log(path)
            return path;
        }
        await insert(x - 1, y, [x, y])
        await insert(x, y - 1, [x, y])
        await insert(x + 1, y, [x, y])
        await insert(x, y + 1, [x, y])
    }

    return false;

}