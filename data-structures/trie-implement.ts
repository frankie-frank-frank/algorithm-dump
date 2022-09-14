/*
TYPESCRIPT IMPLEMENTATION OF TRIE
ADAPTED FROM BEAU TEACHES JAVASCRIPT: https://www.youtube.com/watch?v=7XmS8McW_1U
*/

class TrieNode {
  keys: Map<any, any>;
  end: boolean;
  constructor() {
    this.keys = new Map();
    this.end = false;
  }

  setEnd() {
    this.end = true;
  }

  isEnd() {
    return this.end;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = this.root;
  }

  //add node to trie
  addWord(input: string, node = this.root) {
    if (input.length == 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new TrieNode());
      return this.addWord(input.substring(1), node.keys.get(input[0]));
    } else {
      return this.addWord(input.substring(1), node.keys.get(input[0]));
    }
  }

  //find word in trie
  isWord(word: string) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substring(1);
      }
    }
    return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
  }

  printWord() {
    let words = new Array();
    let search = function (node, string: String) {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length > 0 ? words : null;
  }
}

let myTrie = new Trie();
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
