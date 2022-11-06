import { BTreeNodeType, BTreeNode } from "./BTreeNode";

/**
 * btree namespace
 * @type {BTree}
 */
export default class BTree {
  order: number;
  root: BTreeNodeType;
  constructor(order: number) {
    /** @type {number} */
    this.order = order;
    /**
     * @type {BTreeNode}
     */
    this.root;
  }

  /**
   * Search a value in the Tree and return the node
   * @param {number} value
   * @param {BTreeNode} node
   * @returns {BTreeNode}
   */
  searchValue(value: number, node: BTreeNode): BTreeNode | null {
    if (node.values.includes(value)) {
      return node;
    }
    if (node.leaf) {
      return null;
    }
    let child = 0;
    //iterate till the end of the children list for a value where the child node
    while (child <= node.n && node.values[child] < value) {
      child++;
    }
    return this.searchValue(value, node.children[child]);
  }

  /**
   * Deletes the value from the Tree. O(log N)
   * @param {number} value
   */
  delete(value: number) {}

  /**
   * Delete a value from a node
   * @param {BTreeNode} node
   * @param {number} value
   */
  deleteFromNode(node: BTreeNode, value: number) {}

  /**
   * Transfer one value from the origin to the target. O(1)
   * @param {BTreeNode} origin
   * @param {BTreeNode} target
   */
  transferValue(origin: BTreeNode, target: BTreeNode) {}

  /**
   * Mix 2 nodes into one. O(1)
   * @param {BTreeNode} origin
   * @param {BTreeNode} target
   */
  mergeNodes(origin: BTreeNode, target: BTreeNode) {}

  /**
   * Insert a new value in the tree O(log N)
   * @param {number} value
   */
  insert(value: number) {}

  /**
   * Insert a value in a not-full node. O(1)
   * @param {BTreeNode} node
   * @param {number} value
   */
  insertNonFull(node: BTreeNode, value: number) {}

  /**
   * Divide child node from parent into parent.values[pos-1] and parent.values[pos]
   * O(1)
   * @param {BTreeNode} child
   * @param {BTreeNode} parent
   * @param {number} pos
   */
  split(child: BTreeNode, parent: BTreeNode, pos: number) {}
}
export type TypeofBTree = typeof BTree;
