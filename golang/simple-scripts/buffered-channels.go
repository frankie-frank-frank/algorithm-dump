package main

import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

func main() {
	ch := make( chan int)
	wg.Add(2)

	go func(ch <- chan int) {
		/* Using regular syntax
			for i := range ch {
		        fmt.Println(i)
			} */
		//using comma-okay syntax:
		for {
			if i, ok := <- ch; ok {
				fmt.Println(i)
			} else { break }
		}
		wg.Done()
	}(ch)

	go func(ch chan <- int) {
		ch <- 42
		ch <- 27
		close(ch)
		wg.Done()
	}(ch)
	wg.Wait()
}