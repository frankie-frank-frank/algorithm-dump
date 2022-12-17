var levelOrder = function (root) {
    if (!root) {
        return [];
    }
    let level_order_array = [];
    let queue = [root];
    while (queue.length) {
        let row = [];
        let queue_len = queue.length;
        for (let i = 0; i < queue_len; i++) {
            let node = queue.pop();
            row.push(node.val);
            node.left ? queue.unshift(node.left) : null;
            node.right ? queue.unshift(node.right) : null;
        }
        level_order_array.push(row);
    }
    return level_order_array;
};