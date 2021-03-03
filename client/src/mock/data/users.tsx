import {User} from "../types";


export const MockUsers: User[] = [
    {
        "id": 2,
        "detail_url": "http://127.0.0.1:8000/api/users/2/",
        "user_type": "Admin",
        "last_login": "2021-02-26T14:11:28.658929+01:00",
        "username": "admin",
        "first_name": "Admin",
        "last_name": "Adminsson",
        "email": "admin@f.kth.se",
        "date_joined": "2021-02-25T05:15:24.773382+01:00",
        "is_active": true,
        "kth_id": "admin",
        "year": null,
        "image": "http://127.0.0.1:8000/public/mediafiles/users/2_profile_LvD12I7.jpg",
        "language": "sv",
        "groups": []
    },
    {
        "id": 3,
        "detail_url": "http://127.0.0.1:8000/api/users/3/",
        "user_type": "Admin",
        "last_login": "2021-02-25T15:38:09.562989+01:00",
        "username": "test",
        "first_name": "Test",
        "last_name": "Testsson",
        "email": "test@f.kth.se",
        "date_joined": "2021-02-25T05:16:07.948842+01:00",
        "is_active": true,
        "kth_id": null,
        "year": null,
        "image": null,
        "language": "sv",
        "groups": [
            {
                "id": 2,
                "group": {
                    "id": 2,
                    "detail_url": "http://127.0.0.1:8000/api/groups/2/",
                    "name": "All users",
                    "description": "",
                    "group_type": "Admin",
                    "image": null
                }
            },
            {
                "id": 1,
                "group": {
                    "id": 1,
                    "detail_url": "http://127.0.0.1:8000/api/groups/1/",
                    "name": "F.dev",
                    "description": "",
                    "group_type": "Namnd",
                    "image": "http://127.0.0.1:8000/public/mediafiles/groups/1_group_image_nTfmmMk.png"
                }
            }
        ]
    }
]