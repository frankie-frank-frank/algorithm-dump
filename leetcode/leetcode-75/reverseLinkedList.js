//explanation url: https://www.youtube.com/watch?v=O0By4Zq0OFc&t=600s
var reverseLinkedList =  function(head){
    if(head.next === null || head === null){
        return head
    }
    let reversedList = reverseLinkedList(head.next); //base case, this is simply head.next 
    head.next.next = head;
    head.next = null;
    return reversedList
}