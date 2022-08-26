/*
TYPESCRIPT IMPLEMENTATION OF TRIE
ADAPTED FROM BEAU TEACHES JAVASCRIPT: https://www.youtube.com/watch?v=7XmS8McW_1U
*/
var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.keys = new Map();
        this.end = false;
    }
    TrieNode.prototype.setEnd = function () {
        this.end = true;
    };
    TrieNode.prototype.isEnd = function () {
        return this.end;
    };
    return TrieNode;
}());
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = this.root;
    }
    //add node to trie
    Trie.prototype.addWord = function (input, node) {
        if (node === void 0) { node = this.root; }
        if (input.length == 0) {
            node.setEnd();
            return;
        }
        else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.addWord(input.substring(1), node.keys.get(input[0]));
        }
        else {
            return this.addWord(input.substring(1), node.keys.get(input[0]));
        }
    };
    //find word in trie
    Trie.prototype.isWord = function (word) {
        var node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) {
                return false;
            }
            else {
                node = node.keys.get(word[0]);
                word = word.substring(1);
            }
        }
        return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
    };
    Trie.prototype.printWord = function () {
        var words = new Array();
        var search = function (node, string) {
            if (node.keys.size != 0) {
                for (var _i = 0, _a = node.keys.keys(); _i < _a.length; _i++) {
                    var letter = _a[_i];
                    search(node.keys.get(letter), string.concat(letter));
                }
                if (node.isEnd()) {
                    words.push(string);
                }
            }
            else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            }
        };
        search(this.root, new String());
        return words.length > 0 ? words : null;
    };
    return Trie;
}());
var myTrie = new Trie();
myTrie.addWord("ball");
myTrie.addWord("bat");
myTrie.addWord("doll");
myTrie.addWord("dork");
myTrie.addWord("do");
myTrie.addWord("dorm");
myTrie.addWord("send");
myTrie.addWord("sense");
console.log(myTrie.isWord("doll"));
console.log(myTrie.isWord("dor"));
console.log(myTrie.isWord("dorf"));
console.log(myTrie.printWord());
