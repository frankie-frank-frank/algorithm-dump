package main 

import (
	"fmt"
)

//create a greeter struct and define a method on the greeter struct

func main(){
	var g greeter = greeter{
		greeting: "Hello",
		name: "Go",
	}
	g.greet()
}

type greeter struct {
	greeting string
	name string
}

func (g greeter) greet() {
	fmt.Println(g.greeting, g.name)
}