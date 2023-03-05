package main

import (
	"fmt"
)

func main(){
	//select statements block until one of its cases can run
	firstChannel := make(chan string)
	secondChannel := make(chan string)

	//write to first channel
	go func(){
		firstChannel <- "cow"
	}()

	go func(){
		secondChannel <- "goat"
	}()

	select {
	case firstChannelData := <- firstChannel:
		fmt.Println(firstChannelData)
	case secondChannelData := <- secondChannel:
		fmt.Println(secondChannelData)
	}
}