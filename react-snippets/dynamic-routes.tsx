/*
    HOW IT WORKS:
        - Create a central folder for the segment that will use the dynamic route
        - Add an index file to it
        - add a file with name of [route_param].ts
        - the file above will render content dynamically
        - if you request for a specific file within the central folder ie. a file which you
          defined other than the [route_param].ts or index.ts, next js will match that first 
*/

//import useRouter as a dependency of this file

function ProductDetail(): JSX.Element {
    //assign useRouter to a variable here: const router = useRouter()
    //call use_router_variable's query here: const variable_name = router.query.router_param_in_square_bracket_above
    return (<div></div>)
}