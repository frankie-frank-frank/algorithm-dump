/*
MY IMPLEMENTATION:

class ListNode {
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

    addValue(NodeVal){
        this.next = NodeVal
    }
}

let list1CurrNode;
let finalList;
function mergeTwoLists(list1, list2) {
    // //append list 1 element
    // if(list1.val !== 0){
    //     if()
        
    // }
    // //append list 2 node
    if(!finalList?.next){
        finalList = new ListNode(list2.val, list2.next)
    }
    else {finalList.next = list2}
    //check if there is a next and then return that
    if(list2?.next !== null){
        mergeTwoLists(list1, list2.next)
    }
    return finalList;
}

const listSet1 = new ListNode(1, null)
const listSet10 = listSet1.addValue(new ListNode(2, null))
const listSet11 = listSet10.addValue(new ListNode(3, null))

console.log(mergeTwoLists(listSet1, listSet1))
*/

var mergeTwoLists = function(list1, list2) {
    if (list1 == null) return list2;
    if (list2 == null) return list1;
    console.log(list1)

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    }
    else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};