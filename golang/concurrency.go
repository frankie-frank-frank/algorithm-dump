package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan string)
	go count("count", c)

	for {
		msg, open := <- c
		if !open {
			break
		}
		fmt.Println(msg)
	}
}

func count(thing string, c chan string){
	for i := 1; i <= 5; i++ {
		c <- thing
		time.Sleep(time.Millisecond * 500)
	}
	close(c)
}

//channel with predefined length to prevent blocking calls  from halting channel
/*
	c := make(chan string, 2)
	c <- "hello"
	c <- "world"

	msg := <- c
	fmt.Println(msg)

	msg = <- c
	fmt.Println(msg)
*/

//handling multiple concurrent channels
/*
	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		for {
			c1 <- "Every 500ms"
			time.Sleep(time.Millisecond * 500)
		}
	}()

	go func() {
		for {
			c2 <- "Every two seconds"
			time.Sleep(time.Second * 2)
		}
	}()

	for {
		select {
		case msg1 := <- c1:
			fmt.Println(msg1)
		case msg2 := <- c2:
			fmt.Println(msg2)
		}
	}
*/