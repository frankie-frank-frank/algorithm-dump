// SOLUTION EXPLANATION: https://bohenan.gitbooks.io/leetcode/content/linkedlist/linked-list-cycle-ii.html

// OPTIMAL SOLUTION:
var detectCycle = function(head) {
    if(head===null)
        return head
    let slow=head.next;
    let fast=head.next?head.next.next:null;
    while(fast){
        if(fast===slow){
            let p=head;
            while(p!==fast){
                p=p.next;
                fast=fast.next;
            }
            return p
        }
         slow=slow.next;
        fast=fast.next?.next;
    }
    return null
};