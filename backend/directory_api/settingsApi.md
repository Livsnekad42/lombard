POST http://test.tezlombard.kz/api/settings/settings


    -> [
        {
            id:	number,
            fieldName:	strung,
            description:	strung,
            value:	strung,
            system: boolean,
            enable: boolean,
            isPublic: boolean,
            createdAt:	strung,
            updatedAt:	strung,
        }
    ]


POST http://test.tezlombard.kz/api/settings/create-setting

     <- {
        fieldName: string, *
        description: string,
        value: string, *
        enable: boolean,
        isPublic: boolean
     }
     
     -> {
        fieldName: string, 
        description: string,
        value: string, 
        enable: boolean,
        isPublic: boolean
     }

POST http://test.tezlombard.kz/api/settings/edit-setting

     <- {
        fieldName: string, *
        description: string,
        value: string, *
        enable: boolean,
        isPublic: boolean
     }
     
     -> {
        fieldName: string, 
        description: string,
        value: string, 
        enable: boolean,
        isPublic: boolean
     }

POST http://test.tezlombard.kz/api/settings/destroy-setting

     <- {
        id: number *
     }
     
     -> {
        response: boolen, 
        test: string
     }