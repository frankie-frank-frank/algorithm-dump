package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	res, err := http.Get("http://www.google.com/robots.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close() //defer closing of resource to run immediately the function is read
	robots, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", robots)

	//***********when defer is called
	a := "start"
	defer fmt.Println( a) //even though defer runs after function ends, it prints out "start" since this is the current value when a is set
	a = "end"

	//Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order.
}