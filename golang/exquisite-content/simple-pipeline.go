package main 

import (
	"fmt"
)

//returns a read-only channel
func sliceToChannel(nums []int) <- chan int {
	out := make(chan int)
	//the go routine below will be running asynchronously hence could still be running even on exiting out of the function
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

//returns a read-only channel
func sq(in <- chan int) <- chan int {
	out := make(chan int)
	//the go routine below will be running asynchronously hence could still be running even on exiting out of the function
	go func(){
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func main() {
	//input 
	nums := []int{2,3,4,7,1}
	//stage 1
	dataChannel := sliceToChannel(nums)
	//stage 2
	finalChannel := sq(dataChannel)
	//stage 3
	for n := range finalChannel {
		fmt.Println(n)
	}
}