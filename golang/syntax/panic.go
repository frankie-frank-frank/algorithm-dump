package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello Go!"))
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err.Error())
	}

	// panic with error set to the panic valuee
	fmt.Println("start")
	defer func(){
		if err := recover(); err != nil { //recover() gets panic value ie. "something bad happened" in this case. it is an inbuilt function. only useful for defer functions
			log.Println("Error:", err) 
		}
	}()
	panic("something bad happened") 
	fmt.Println("end") //rightfully so. it should be unreachable
}