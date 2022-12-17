/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */

//THIS IS A "RUNNING MEMO". IT DOES NOT RETURN A FIXED VALUE FROM THE 
// FOR LOOP. INSTEAD, YOU HAVE THE UPDATED ARRAY RETURNED TO THE PARENT
// SO ONCE IT HITS THE BASE CASE, IT SIMPLY RETURNS OUTPUT TO THE
//N-1 PARENT, AND THEN RETURN THE UPDATED ARRAY WITH N-1'S VALUE
//TO N-2, etc.
var preorder = function(root, output=[]) {
    if(!root) return output;
    output.push(root.val);
    for(const child of root.children){
        preorder(child, output)
    }
    return output
};