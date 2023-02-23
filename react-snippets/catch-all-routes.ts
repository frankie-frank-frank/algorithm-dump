/*
    Consider: <domain_name>/docs/feature1/concept1
    you can use a catchall route for this

    
    /////////////////////////////////////////////////////
    Filename: [...params].js -> you can use [[...params]].js if you want to render the default return of the default 
    export ie. the h1 tag with Docs Home Page below
    ////////////////////////////////////////////////////

    import { useRouter } from 'next/router'

    function Doc(){
        const router = useRouter()
        const { params = [] } = router.query
        console.log(params)

        if (params.length === 2){
            return (
                <h1>
                    Viewing docs for feature {params[0]} and concept {params[1]}
                </h1>
            )
        }
        else if (params.length === 1){
            return (
                <h1>
                    Viewing docs for feature {params[0]}
                </h1>
            )
        }
        return <h1>Docs Home Page</h1>
    }

    export default Docs
*/