package main

import ( "fmt" )

func main() {
	var a int = 42
	var b *int = &a //points to variable 'a' by reference so it updates whenever a updates
	fmt.Println(a, *b)
	a = 27
	fmt.Println(a, *b)
	*b = 14 //dereference 'b' and assign it to 14. this automatically reassigns 'a' since 'a' is referenced by 'b'
	fmt.Println(a, *b)

	//OBJECT POINTER:
	//simple my struct
	var ms *myStruct //initialized to nil
	ms = &myStruct{foo: 42}
	fmt.Println(ms)

	//using the built-in new function
	ms = new(myStruct)
	(*ms).foo = 42
	fmt.Println((*ms).foo)

	//simpler alternative
	ms.foo = 42
	fmt.Println(ms.foo)

	//arrays as pointer by value
	a_array := []int{1,2,3}
	b_array := a_array //array data update in a_array does not affect b_array since b references it by value
	fmt.Println(a_array, b_array)
	a_array[1] = 32 //updating this updates only a_array since it is referenced by value
	fmt.Println(a_array, b_array) 

	//slices as underlying data:
	a_slice := []int{1,2,3} 
	b_slice := a_slice //slices copy underlying variable storing the data. as such
	fmt.Println(a_slice, b_slice) //([1,2,3], [1,2,3])
	a_slice[1] = 42 //updating this updates b as well since b points to a via reference by address
	fmt.Println(a_slice, b_slice) //([1,42,3], [1,42,3])

	//maps as underlying data: similar to slices as underlying data
	a_map := map[string]string {"foo": "bar", "baz": "buz"}
	b_map := a_map
	fmt.Println(a_map, b_map)
	a_map["foo"] = "qux"
	fmt.Println(a_map, b_map)
}

type myStruct struct {
	foo int
}