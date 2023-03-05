package main

/* GO ROUTINES WITH SLEEP: BASIC
import (
	"fmt"
	"time"
)

func main(){
	var msg string = "Hello"

	//call go routine with anonymous function
	go func(msg string){
		fmt.Println(msg)
	}(msg)	
	// reassigning on the next line causes no significant effect
	msg = "Changed"
	time.Sleep(100 * time.Millisecond)
}
*/

/*go routine with synchronized wait groups
import (
	"fmt"
	"sync"
)

var wg = sync.WaitGroup{}

func main(){
	var msg = "Hello"
	wg.Add(1)
	go func(msg string){
		fmt.Println(msg)
		wg.Done()
	}(msg)
	msg = "Goodbye"
	wg.Wait()
}
*/

/*
pro of code section below: synchronizing multiple go routines with mutex and locking outside of the context of the go routine
con: this is a bad use of goroutine since you do are currently not using concurrency and are using mutex to synchronize everything

import (
	"fmt"
	"runtime"
	"sync"
)

var wg = sync.WaitGroup{}
var counter = 0
var m = sync.RWMutex{}

func main() {
	runtime.GOMAXPROCS(100)
	for i := 0; i < 10 ; i++ {
		wg.Add(2)
		m.RLock()
		go sayHello()
		m.Lock()
		go increment()
	}
	wg.Wait()
}

func sayHello() {
	fmt.Printf("Hello #%v\n", counter)
	m.RUnlock()
	wg.Done()
}

func increment() {
	counter++
	m.Unlock()
	wg.Done()
}
*/