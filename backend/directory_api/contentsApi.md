POST http://test.tezlombard.kz/api/content/create-content


    <- {
        componentName: string *, 
        content: : string *, 
        header: : string,
        enable: boolean,
    }


POST http://test.tezlombard.kz/api/content/edit-content

     <- {
        componentName: string,
        content: : string,
        header: : string,
        enable: boolean,
    }
     
     -> {
        componentName: string,
        content: : string,
        header: : string,
        enable: boolean,
     }

POST http://test.tezlombard.kz/api/content/destroy-content

     <- {
        id: number *
     }
     
     -> {
        response: boolen, 
        test: string
     }