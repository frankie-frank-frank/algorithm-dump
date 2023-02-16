/*
	USECASE OF THIS CODING STRUCTURE:
	WHEN YOU ARE MONITORING A CHANNEL AND YOU NEED A WAY TO MAKE THE GO ROUTINE MONITORING THOSE CHANNELS TO TERMINATE
*/
package main

import (
	"fmt"
	"time"
)

const (
	logInfo = "INFO"
	logWarning = "WARNING"
	logError = "ERROR"
)

type logEntry struct {
	time time.Time
	severity string 
	message string 
}

var logCh = make(chan logEntry, 50)
//create signal-only channel with empty struct: can send any data through only if any data is sent or received
var doneCh = make(chan struct{})

func main() {
	go logger()
	
	logCh <- logEntry{time.Now(), logInfo, "App is starting"}
	logCh <- logEntry{time.Now(), logInfo, "App is shutting down"}

	time.Sleep(100 * time.Millisecond)
	doneCh <- struct{}{}
}

func logger() {
	//simple solution
	/*	
	for entry := range logCh {
		fmt.Printf("%v - [%v]%v\n", entry.time.Format("2006-01-02T15:04:05"), entry.severity, entry.message)
	}
	*/

	// slightly efficient solution:
	for {
		select {
		case entry := <- logCh:
			fmt.Printf("%v - [%v]%v\n", entry.time.Format("2006-01-02T15:04:05"), entry.severity, entry.message)
		case <- doneCh:
			break	
		}
	}
}