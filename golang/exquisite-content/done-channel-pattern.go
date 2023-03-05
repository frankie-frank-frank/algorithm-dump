package main

import (
	"fmt"
	"time"
)

//create a read-only channel
func doWork(done <- chan bool){
	for {
		select {
		// break if there is any data on the read-only channel
		case <- done:
			return;
		default:
			fmt.Println("do work")
		}
	}
}

func main(){
	done := make(chan bool)

	go doWork(done)

	time.Sleep(time.Second * 3)

	//parent go routine closes the child go routine by using the done channel
	close(done)
}