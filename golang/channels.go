package main 

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

//simple go channel with 
func main() {
	ch := make(chan int)
	wg.Add(2)

	//read only channel
	go func(ch <- chan int) {
		i := <- ch
		fmt.Println(i)
		wg.Done()
	}(ch)

	// write only channel
	go func(ch chan <- int) {
		ch <- 42
		wg.Done()
	}(ch)

	wg.Wait()
}