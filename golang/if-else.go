package main

import (
	"fmt"
	"time"
)

func main() {
	//first examples
	// statePopulation := map[string]int{
	// 	"California" : 2000,
	// 	"Texas" : 2500,
	// }
	// if pop, ok := statePopulation["California"]; ok {
	// 	fmt.Println((pop))
	// }


	//golang does not need a break for any switch case
	var i interface{} = [3]int{}
	switch i.(type) {
	case int: 
		fmt.Println("i is an int")
	case float64:
		fmt.Println("i is a float64")
	case string:
		fmt.Println("i is a string")
	case [3]int:
		fmt.Println("i is [3]int")
	default:
		fmt.Println("i is another type")
	}

	//Switch without a condition is the same as switch true.
	//This construct can be a clean way to write long if-then-else chains.
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}