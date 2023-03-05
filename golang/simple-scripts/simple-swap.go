package main 

import (
	"fmt"
)

func swap(x string, y string) (string, string){
	return y,x
}

func main(){
	a,b := swap("hey", "ho")
	fmt.Println(a, b)
}