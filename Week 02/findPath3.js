


let map = localStorage['map'] ? JSON.parse(localStorage['map']) : (function initData(){
    let data = [];
    for(let i = 0; i < 10000; i++){
        data.push({
            value: 0
        })
    }
    return data;
})();

let container = document.getElementById('container');

for(let y = 0; y < 100; y++){
    for(let x = 0; x < 100; x++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        
        if(map[100 * y + x].value === 1){
            cell.style.backgroundColor = 'black';
        }

        cell.addEventListener('mousemove',() => {
            if(mousedown){
                if(clear){
                    // 右键清除逻辑
                    cell.style.backgroundColor = '';
                    map[100 * y + x].value = 0
                }else{
                    // 移动覆盖过的格子变黑色
                    cell.style.backgroundColor = 'black';
                    map[100 * y + x].value = 1
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
    var queue = new Sorted([start], (a, b) => distance(a) - distance(b));
    console.log(queue)
    async function insert(x, y, pre){
        // 处理边缘场景
        if(x < 0 || x >= 100 || y < 0 || y >= 100) return;

        // 已经有值，表示是黑色块，路不通
        if(map[x * 100 + y].value) return;

        await sleep(5);
        container.children[x * 100 + y].style.backgroundColor = 'lightgreen';
        map[x * 100 + y].value = 2;
        map[x * 100 + y].pre = pre;
        console.log([x, y])
        queue.give([x, y])
    }

    function distance(point){
        return (point[0] - end[0]) ** 2 + (point[1] - end[1]) ** 2
    }

    while(queue.data.length){
        let [x, y] = queue.take();
        // console.log(x, y)
        if(x === end[0] && y === end[1]){
            let path = [];
            while(x !== start[0] || y !== start[1]){
                path.push(map[x * 100 + y].value);
                [x, y] = map[x * 100 + y].pre;
                await sleep(20);
                container.children[x * 100 + y].style.backgroundColor = 'pink'
            }
            return path;
        }
        await insert(x - 1, y, [x, y])
        await insert(x, y - 1, [x, y])
        await insert(x + 1, y, [x, y])
        await insert(x, y + 1, [x, y])


        await insert(x - 1, y - 1, [x, y])
        await insert(x + 1, y - 1, [x, y])
        await insert(x + 1, y + 1, [x, y])
        await insert(x - 1, y + 1, [x, y])
    }

    return false;

}


class Sorted {
    constructor(data, compare){
        this.data = data.slice();
        this.compare = compare  || ((a, b) => a - b);
    }

    take(){
        if(!this.data.length) return;

        let min = this.data[0];
        let minIndex = 0;

        for(let i = 1; i < this.data.length; i++){
            if(this.compare(this.data[i], min) < 0){
                min = this.data[i];
                minIndex = i;
            }
        }
        // 保证少移动数据, 将最小值和数组最后一个替换并且pop掉
        this.data[minIndex] = this.data[this.data.length - 1];
        this.data.pop();
        return min
    }

    give(v){
        this.data.push(v)
    }
}