package main

import (
	"fmt"
)

func main(){
	//scoping golang function to prevent asynchronous outer state from affecting inner function
	for i := 0; i < 5; i++ {
		func(i int){
			fmt.Println(i)
		}(i)
	}

	//functions as variables
	var funcVar func()= func(){ fmt.Println("hello")}
	funcVar(); 

	//a simple divide function:
	var divide func(float64, float64) (float64, error)
	divide = func(a, b float64) (float64, error) {
		if b == 0.0 { 
			return 0.0, fmt.Errorf("Cannot divide by zero")
		} else { 
			return a / b, nil
		}
	}
	d, err := divide(5.0, 3.0)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(d)
}