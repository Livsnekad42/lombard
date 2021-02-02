POST http://test.tezlombard.kz/api/public/createComment
    
    Создание комментария
    
    <- data: {
       username: string;
       content: string;
       project: string;
       avatar: string;
       isPublic: boolean;
       isRead: boolean;
       cityId: number;
    }

POST http://test.tezlombard.kz/api/public/edit-comment

    Изменение комментария
    
    <- data: {
       id: uint;
       username: string;
       content: string;
       project: string;
       avatar: string;
       isPublic: boolean;
       isRead: boolean;
       cityId: number;
    }