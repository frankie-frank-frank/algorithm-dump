package main

import (
	"fmt"
)

func main() {
	statePopulation := map[string]int{
		"California" : 2000,
		"Texas" : 2500,
	}
	if pop, ok := statePopulation["California"]; ok {
		fmt.Println((pop))
	}
}