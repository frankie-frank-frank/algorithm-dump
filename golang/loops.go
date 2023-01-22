package main

import (
	"fmt"
)

func main() {
	for i,j := 0,0; i < 5; i,j = i+1, j+1 {
		fmt.Println(i, j)
	}
	//same as above:
	/*
	i := 0
	for i < 5 {
		fmt.Println(i)
		i++
	}
	*/
	//alternative three:
	/*
	i := 0
	for {
		fmt.Println(i)
		i++
		if i == 5 { break }
	}
	*/

	//*************************

	//using continue statement with for loops:
	//the code below prints only odd numbers less than 10
	/*
	for i := 0; i < 10 ; i++ {
		if i%2 == 0 { continue }
		fmt.Println(i)
	}
	*/

	//**************************

	//breaking out of nested loops to an outer loop using labels:
	/*
	Loop: //this is the label for the outer loop
		for i := 1; i <= 3; i++ {
			for j := 1; j <= 3; j++ {
				fmt.Println(i * j)
				if i * j >= 3 {
					break Loop //breaks into outer loop containing the Loop label ie. i, instead of inner loop ie. j
				}
			}
		}
	*/

	//***********************
	//Looping through a collection of arbitrary size:
	/*
	s := []int{1,2,3}
	for k, v := range s {
		fmt.Println(k, v)
	}
	*/

	//looping through a string:
	/*
	s := "hello Go!"
	for k, v := range s {
		fmt.Println(k, string(v))
	}

	//to print only keys: for k := range s {}
	//to print only values: for _, v := range s {}
	*/
}