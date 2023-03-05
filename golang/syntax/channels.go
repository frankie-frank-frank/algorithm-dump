package main 

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

//simple channels:
/*
	func main(){
		ch := make(chan string)

		//write to channel:
		go func() {
			ch <- "data"
		}()

		//read from channel:
		msg := <- ch
		fmt.println(msg)
	}
*/

//simple specialized channels
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