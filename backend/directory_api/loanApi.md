// Разрешена ли пролонгация, если нет, то возвращается 
// prolongationState = false
// Если в таблице contents найдена запись с значением componentName = "prolongationState_disabled",
// в ответе вернется контент, привязанный к тому значению
POST http://test.tezlombard.kz/api/loan/isProlongation

     -> {
        prolongationState: boolean *,
        content: {
            id: number, 
            componentName: string, 
            content: string, 
            header: string, 
            enable: boolean, 
            createdAt: string, 
            updatedAt: string
        }
     }