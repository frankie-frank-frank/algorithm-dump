// var URL = require('url').URL;
// const myURL = new URL('https://example.org:8888')
// console.log(myURL.port)
// myURL.port = '443'
// console.log(myURL.port)

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key){
        if(this.map.has(key)){
            let val = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, val);
            return val
        } else {
            return -1
        }
    }

    put(key, val){
        if(this.get(key) === -1){
            if(this.capacity === this.map.size){
                for(let keyVal of this.map){
                    this.map.delete(keyVal[0])
                    break
                }
            }
        }
        this.map.set(key, val)
    }

    getty(){
        for(let keyVal of this.map){
            this.map.delete(keyVal[0])
            break;
        }
        console.log(this.map)
    }
}

const eeval = new LRUCache(3)
eeval.put(1,2)
eeval.put(2,3)
eeval.put(3,8)
eeval.put(2,4)
console.log(eeval)
