# RepoProvas 📝

## Description

**RepoProvas** is a service for sharing tests between students. The user can search for old collage/school tests and add new ones to the system!

## Built With

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
## Features

- User Registration and Login;
- List Tests by Disciplines;
- List Tests by Teachers;
- Create tests;

## API Reference

### AUTHENTICATION

#### Sign Up

```http
POST /sign-up
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |
| `confirmPassword`| `string` | **Required**, must be equal to `password` |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
  "confirmPassword": "pass1234"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `409`    | **Conflict**, user is already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Sign In

```http
POST /sign-in
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `email`          | `string` | **Required**, must be a valid email format          |
| `password`       | `string` | **Required** |

```json
{
  "email": "example@gmail.com",
  "password": "pass1234",
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**, returns a token          |
| `json`           |   `401`    | **Unauthorized**, Invalid credentials |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

```json
{
  "token": "JWT token"
}
```

### TESTS

#### Notes

- Every `/tests` route is authenticated using **Bearer TOKEN**;
- The token must be sent in the Authorization request header;
- The API will return the following errors if the authentication fails:

| Code             | Description  |
| :--------------- | :----------- |
| `401`            | **Unauthorized**, invalid token     |
| `400`            | **Bad Request**, token was not sent     |
| `422`            | **Unprocessable Entity**, token is not in the Bearer format     |

#### Create Test

```http
POST /tests
```

##### Request

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**        |
| `pdfUrl`         | `string` | **Required**, must be a valid URL format |
| `categoryId`     | `number` | **Required**, must be an integer |
| `teacherDisciplineId`| `number` | **Required**, must be an integer |

```json
{
  "name": "Test Example",
  "pdfUrl": "http://example.com",
  "category": "Prática",
  "teacher": "Diego Pinho",
  "discipline": "React"
}
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `empty`          |   `201`    | **Created**          |
| `json`           |   `404`    | **Not Found**, category , teacher or Discipline not found |
| `json`           |   `409`    | **Conflict**, Test already registered |
| `json`           |   `422`    | **Unprocessable Entity**, request body is invalid |

#### Get Tests by Discipline

- This route returns the tests filtered by Terms-Disciplines-Categories;

```http
GET /tests/disciplines
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :---------------------------------  |
| `json`           |   `200`    | **OK**                              |

```json
[
  {
    "id": 1,
    "number": 1,
    "Disciplines": [
      {
        "id": 1,
        "name": "HTML e CSS",
        "termId": 1,
        "Categories": []
      },
      {
        "id": 4,
        "name": "Humildade",
        "termId": 1,
        "Categories": []
      }
    ]
  },
  {
    "id": 2,
    "number": 2,
    "Disciplines": [
      {
        "id": 2,
        "name": "JavaScript",
        "termId": 2,
        "Categories": []
      },
      {
        "id": 5,
        "name": "Planejamento",
        "termId": 2,
        "Categories": []
      }
    ]
  },
  {
    "id": 3,
    "number": 3,
    "Disciplines": [
      {
        "id": 3,
        "name": "React",
        "termId": 3,
        "Categories": [
          {
            "id": 1,
            "name": "Projeto",
            "Tests": [
              {
                "id": 1,
                "name": "GG",
                "pdfurl": "https://www.uricer.edu.br/siteeaee/",
                "categoryId": 1,
                "teacherDisciplineId": 3,
                "Teacher": {
                  "id": 1,
                  "name": "Diego Pinho"
                }
              }
            ]
          }
        ]
      },
      {
        "id": 6,
        "name": "Autoconfiança",
        "termId": 3,
        "Categories": []
      }
    ]
  },
  {
    "id": 4,
    "number": 4,
    "Disciplines": []
  },
  {
    "id": 5,
    "number": 5,
    "Disciplines": []
  },
  {
    "id": 6,
    "number": 6,
    "Disciplines": []
  }
]
```

#### Get Tests by Teacher

- This route returns the tests filtered by Teachers-Categories;

```http
GET /tests/teachers
```

##### Response

| Body             |  Code      |  Description                        |
| :--------------- | :-------   | :--------------------------------- |
| `json`           |   `200`    | **OK**          |

```json
[
  {
    "id": 1,
    "name": "Diego Pinho",
    "Categories": [
      {
        "id": 1,
        "name": "Projeto",
        "Tests": []
      },
      {
        "id": 2,
        "name": "Prática",
        "Tests": []
      },
      {
        "id": 3,
        "name": "Recuperação",
        "Tests": []
      }
    ]
  },
  {
    "id": 2,
    "name": "Bruna Hamori",
    "Categories": [
      {
        "id": 1,
        "name": "Projeto",
        "Tests": []
      },
      {
        "id": 2,
        "name": "Prática",
        "Tests": []
      },
      {
        "id": 3,
        "name": "Recuperação",
        "Tests": []
      }
    ]
  }
]
```

### NOTES

When a request returns an error, the response is a json:

```json
{
  "type": "Error Type",
  "message": "Error Details"
}
```

## Running the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/akiraTatesawa/repoprovas.git
    ```

2. Navigate to the project directory:

    ```bash
    cd repoprovas/
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set your environment variables following the .env.sample file:

    | Name              | Type     |
    | :--------------- | :------- |
    | `DATABASE_URL`   | `string` |
    | `PORT`           | `number` |
    | `JWT_SECRET`     | `number` |

   ```ts
    PORT=
    DATABASE_URL=
    JWT_SECRET=
   ```

5. Run the Build command:

   ```bash
   npn run build
   ```

6. Run the project on dev mode:

    ```bash
    npm run dev
    ```

## Testing the API

### Endpoints (Thunder Client)

1. Import the collection
3. Go to the RepoProvas collection and you are ready to use the API!

### Jest

1. Create a `.env.test` file and set your testing database url `DATABASE_URL`;
2. Run the command:

    ```bash
    npm run test
    ```  
