var _$ = Symbol('$');

class Tire {
    constructor(){
        this.root = Object.create(null);
    }

    insert(word){
        let node = this.root;
        for(let c of word){
            if(!node[c]){
                node[c] = Object.create(null)
            }
            node = node[c]
        }
        if(!(_$ in node)){
            node[_$] = 0
        }
        node[_$]++
    }

    most(){
        let max = 0;
        let maxWord = null;
        let visit = (node, word) => {
            if(node[_$] && node[_$] > max){
                max = node[_$];
                maxWord = word;
            }
            for(let p in node){
                visit(node[p], word + p)
            }
        }
        visit(this.root, '');
        console.log(maxWord);
    }
}

var tire = new Tire();
tire.insert('zzzssss');
tire.insert('sd');
tire.insert('df');
tire.insert('et');
tire.insert('et');




