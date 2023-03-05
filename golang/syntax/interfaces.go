package main 

import (
	"fmt"
)

/*
BASIC:
func main(){
	var w Writer = ConsoleWriter{}
	w.Write([]byte("Hello Go!"))
}

//interfaces in golang define behavior, not data
type Writer interface {
	Write([]byte) (int, error) //int is
}

type ConsoleWriter struct {}

//create a method on a struct that has the signature of an interface 
func (cw ConsoleWriter) Write(data []byte) (int, error) {
	n, err := fmt.Println(string(data))
	return n, err
}
*/

func main(){
	myInt := IntCounter(0)
	var inc Incrementer = &myInt;
	for i := 0; i < 10; i++ {
		fmt.Println(inc.Increment())
	}
}

type Incrementer interface {
	Increment() int
}

type IntCounter int 

func (ic *IntCounter) Increment() int {
	*ic++;
	return int(*ic)
}

//additional notes from fc:
/*
	- creating a struct with multiple interfaces
	- type casting and comma-okay syntax
	- additional benefits of empty interfaces 
*/