tests = {
    "valid_tests": [
        {
            "data": {
                "url": "http://127.0.0.1:8000/ok",
                "page_type": "ok",
                "slug": "ok",
                "name": "ok"
            }
        },
        {
            "data": {
                "url": "http://127.0.0.1:8000/ok2",
                "page_type": "ok2",
                "slug": "ok2",
                "name": "ok2"
            }
        }
    ],
    "invalid_tests": [
        {
            "code": "invalid",
            "invalid_fields": ["url"],
            "data": {
                "url": "n",
                "page_type": "ok",
                "slug": "ok",
                "name": "ok"
            },
        },
        {
            "code": "blank",
            "invalid_fields": ["url"],
            "data": {
                "url": "",
                "page_type": "ok",
                "slug": "ok",
                "name": "ok"
            },
        },
        {
            "code": "null",
            "invalid_fields": ["url"],
            "data": {
                "url": None,
                "page_type": "ok",
                "slug": "ok",
                "name": "ok"
            },
        }
    ],
    "unique_tests": [
        {
            "setup": [
                {
                    "url": "http://127.0.0.1:8000/ok",
                    "page_type": "1",
                    "slug": "1",
                    "name": "1"
                },
                {
                    "url": "http://127.0.0.1:8000/2",
                    "page_type": "2",
                    "slug": "2",
                    "name": "2"
                }
            ],
            "invalid_fields": ["url"],
            "data": {
                "url": "http://127.0.0.1:8000/ok",
                "page_type": "1",
                "slug": "1",
                "name": "1"
            }

        }
    ]
}
