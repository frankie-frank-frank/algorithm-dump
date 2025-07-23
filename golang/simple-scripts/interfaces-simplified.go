package main

import (
	"fmt"
	"math"
)

type Shape interface {
	Area() float64
}

type Measurable interface {
	Perimeter() float64
}


type Geometry interface {
	Shape
	Measurable
}

type Rectangle struct {
	width, height float64
}

type CalculationError struct {
	msg string
}

// function type functions as a call on the function
func (r Rectangle) Area() float64 {
	return r.height * r.width
}

func (r Rectangle) Perimeter() float64 {
	return 2 * (r.height + r.width)
}

func describeShape(g Geometry) {
	fmt.Println(g.Area())
	fmt.Println(g.Perimeter())
}

func calculateArea()

func (ce CalculationError) Error() string {
	return ce.msg
}

func squareRoot(val float64) (float64, error) {
	if val < 0 {
		return 0, CalculationError{msg: "Invalid Error"}
	}
	return math.Sqrt(val), nil
}

func intSimplified() {
	// call on a type
	rect := Rectangle{width: 5, height: 10}
	describeShape(rect)
	// call on a simple constant
	squareRoot(5);
}

