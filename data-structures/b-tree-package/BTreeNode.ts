import { TypeofBTree } from "./btree";

/* REFERENCE: https://levelup.gitconnected.com/building-a-b-tree-in-javascript-4482dee083cb*/
export class BTreeNode {
  values: Array<number>;
  leaf: boolean;
  children: Array<BTreeNode>;
  tree: TypeofBTree | null;
  parent: BTreeNode | null;
  constructor(isLeaf: boolean) {
    this.values = [];
    this.leaf = isLeaf;
    this.children = [];
    this.tree = null;
    this.parent = null;
  }

  /**
   * Number of values
   * @returns {number}
   */
  get n(): number {
    return this.values.length;
  }

  /**
   * Add values
   * @param {number} value
   */
  addValue(value: number) {
    if (!value) {
      return;
    }
    let pos = 0;
    //if value at a position is less thann the value to be added
    //keep incrementing 'pos'
    while (pos < this.n && this.values[pos] < value) {
      pos++;
    }
    this.values.splice(pos, 0, value);
  }

  /**
   * Remove value at position and return
   * @param {number} pos
   */
  removeValue(pos: number){
    if(pos>=this.n){
        return;
    }
    return this.values.splice(pos, 1)[0]
  }

  /**
   * Add child to node at position pos
   * @param {BTreeNode} node
   * @param {number} pos
   */
  addChild(node: BTreeNode, pos: number){
    this.children.splice(pos, 0, node);
    node.parent = this;
  }

  /**
   * Remove node from position and return it
   * @param {number} pos
   * @param {BTreeNode}
   */
  removeChild(pos: number){
    return this.children.splice(pos, 1)[0];
  }
}

export type BTreeNodeType = typeof BTreeNode;