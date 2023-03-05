package main

import (
	"fmt"
)

func main(){
	newChannel := make(chan int, 3)

	stringChars := []int{1, 2, 3}

	for _, s := range stringChars{
		select {
		case newChannel <- s:
		}
	}

	close(newChannel)

	for result := range newChannel {
		fmt.Println(result)
	}
}