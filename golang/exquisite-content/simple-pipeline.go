package main 

import (
	"fmt"
)

/*
	THIS IS A FULLY SYNCHRONOUS FIFO PIPELINE
*/

//returns a read-only channel
func sliceToChannel(nums []int) <- chan int {
	out := make(chan int)
	//the go routine below will be running asynchronously hence could still be running even on exiting out of the function
	// it puts a value onto the out channel to be fed to sq() below and then blocks. since it is unbuffered, it has a capacity of one hence 
	// it will only place one value on the channel and then block
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
	// it reads a value from the in channel( from sliceToChannel() in this instance ) and then blocks
	go func(){
		for n := range in {
			out <- n * n
		}
		//we can close channel when sliceToChannel() closes
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