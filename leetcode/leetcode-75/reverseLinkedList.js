var reverseLinkedList =  function(head){
    if(head.next === null || head === null){
        return head
    }
    let reversedList = reverseLinkedList(head.next);
    head.next.next = head;
    head.next = null;
    return reversedList
}