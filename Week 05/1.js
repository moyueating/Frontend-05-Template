var obj = {
    a: 1,
    b: 2
}

var pro = new Proxy(obj, {
    set(target, propKey, value, receiver) {
        console.log(target, propKey, value, receiver)
        target[propKey] = value
    }
})

pro.c = 4;