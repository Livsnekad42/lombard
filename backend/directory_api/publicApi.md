GET http://test.tezlombard.kz/api/public/all-city-location

   
    -> [City: {
        id: int64;
        cityName: string;
        latitude: float64;
        longitude: float64;
        createdAt: Date;
        updatedAt: Date;
    }]

  
POST http://test.tezlombard.kz/api/public/createComment
     
     <- {
        username: string;
        content: string;
        project: string;
        avatar: string;
        isPublic: boolean;
        cityId: number
     }
     
     -> {
        username: string;
        content: string;
        project: string;
        avatar: string;
        isPublic: boolean;
        cityId: number
     }


// калькулятор стоимости кредита
POST http://test.tezlombard.kz/api/public/calculate
  

    <- {
        "creditSum": 100000,
        "creditPeriod": 20
    }

    -> {'data': 
        {
            'interestSum': 6000, 
            'commissionSum': 0, 
            'totalSum': 106000, 
            'minDays': 1, 
            'returnDate': '17.01.2021', 
            'guaranteeDate': '16.02.2021'
        }
    }


// Settings
GET http://test.tezlombard.kz/api/public/settings


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

// contents
GET http://test.tezlombard.kz/api/public/contents-app


    -> [
        {
            id:	number,
            componentName: string,
            content: string,
            header: string,
            enable: boolean,
            createdAt:	strung,
            updatedAt:	strung,
        }
    ]