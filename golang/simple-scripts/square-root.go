package main

import (
	"fmt"
)

func Sqrt(x float64) float64 {
	z := 1.0
	loopCounter := 0
	for loopCounter < 10 {
		z = z - (z*z -x) / (2*z)
		fmt.Println(z)
		loopCounter++
	}
	return z
}

func main() {
	fmt.Println(Sqrt(2))
}
