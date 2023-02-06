package main 

import (
	"fmt"
	"strconv"
	// "math"
)

//simple add function:
func add(x int, y int) int {
	return x + y
}

func main(){
	// basic variable declaration
	var i int = 42
	j := 24
	var k float32 = 28
	fmt.Println(j)
	fmt.Println(i)
	fmt.Printf("%v, %T\n", k,k)
	fmt.Println("Hello, world")

	//type conversion
	var p int = 42;
	fmt.Println(i)

	var q float32 = float32(p)
	fmt.Println(q)

	var r string = strconv.Itoa(p)
	fmt.Println(r)

	/* PRIMITIVES */
	//boolean primitives
	var n bool = false
	fmt.Printf("%v, %T", n, n)

	//floating point literals
	m := 4.14
	m = 13.7e72
	m = 2.1E14
	fmt.Printf("%v\n", m)

	//complex numbers
	var cpx complex64 = 1 + 2i
	fmt.Printf("%v, %T\n", cpx, cpx)
	fmt.Printf("%v, %T\n", real(cpx), real(cpx))
	fmt.Printf("%v, %T\n", imag(cpx), imag(cpx))

	var createCpx complex64 = complex(5, 12)
	fmt.Printf("%v, %T\n", createCpx, createCpx)

	//string primitive
	s1 := "this is a string"
	fmt.Printf("%v, %T\n", string(s1[2]), s1[2])

	s2 := "this is another string"
	b := []byte(s2)
	fmt.Printf("%v, %T\n", b, b)

	//rune: for utf32 characters
	var ru rune = 'a'
	fmt.Printf("%v, %T\n", ru, ru)

	/* CONSTANTS */
	//implicit conversions:
	const ia = 22
	var ib int8 = 43
	fmt.Printf("%v, %T", ia+ib, ia+ib)

	//enumerated values with iota, scoped to a particular constant block 
	const (
		_ = iota
		enuma
		enumb
		enumc
	)

	fmt.Printf("%v\n", enuma)
	fmt.Printf("%v\n", enumb)
	fmt.Printf("%v\n", enumc)

	//bit shifting by iota
	const (
		isAdmin = 1 << iota // 1<<0 = 1
		isHeadquarters // 1<<1 = 2
		canSeeFinancials // 1<<2 = 4

		canSeeAfrica
		canSeeAsia
		canSeeEurope
		canSeeNorthAmerica
		canSeeSouthAmerica
	)

	var roles byte = isAdmin | canSeeFinancials | canSeeEurope
	fmt.Printf("%b\n", roles)
	fmt.Printf("Is admin? %v\n", isAdmin & roles == isAdmin)
	fmt.Printf("Is HQ? %v\n", isHeadquarters & roles == isHeadquarters)

	/* ARRAYS AND SLICES */
	grades := [3]int{97, 83, 93}
	gradesNotSized := [...]int{}
	var students [3]string
	fmt.Printf("Unassigned-sized grades array: %v", gradesNotSized)
	fmt.Printf("Grades: %v", grades)
	students[0] = "Manuel"
	fmt.Printf("Students: %v", students)
	//length
	fmt.Printf("Size: %v", len(students))
	//copying arrays
	var arr1 = [...]int{1,2,3}
	arr2 := arr1
	arr2[1] = 5
	fmt.Printf("%v", arr1)
	fmt.Printf("%v", arr2)
	//shallow copying of array
	arr3 := [...]int{1,2,3}
	arr4 := &arr3 //makes arr3 and arr4 point to the same data
	arr4[1] = 5 // arr3 -> [1,5,3], arr4 -> [1,5,3]

	////SLICES
	//traditional slice: initialized with empty array
	arr8 := []int{1,2,3,4,5,6,7,8,9,10}
	fmt.Printf("%v", arr8)
	//alternate slice: uses array syntax but its behavior is same as traditional because of its operations
	arr5 := [...]int{1,2,3,4,5,6,7,8,9,10}
	arr6 := arr5[:] //copy all elements
	arr7 := arr5[3:] //copy all elements from 4 to end
	fmt.Printf("%v, %v", arr6, arr7)

	//using make to make slices:
	makeA := make([]int, 3)
	fmt.Printf("Capacity: %v\n", cap(makeA))

	//"spread operator" in Golang:
	makeA = append(makeA, []int{2,3,4,5}...)

	//remove element from middle of array
	arrBeg := []int{1,2,3,4,5}
	arrEnd := append(arrBeg[:len(arrBeg)/2], arrBeg[len(arrBeg)/2+1:]...)
	fmt.Printf("%v", arrEnd)

	//variable with initializers
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
