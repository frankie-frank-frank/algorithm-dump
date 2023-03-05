package main

import (
	"fmt"
	"time"
)

func main(){
	go func() {
		for {
			select {
			default:
				//perform infinite action here
				fmt.Println("fun guy laugh")
			}
		}
	}()

	//this breaks the infinite loop after two seconds
	time.Sleep(time.Second * 2)
}