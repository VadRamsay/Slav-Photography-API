# Slav Photography API 

Backend API for the front-end Slav Photography. 

## Tech Used
- Node.js/Express
- mySQL
- bcrypt (for pass hashing)
- JWT (for auth)

## Getting Started

1. Clone the repo
2. Run 'npm install' 
3. Create a '.env' file (see below)
4. Create a MySQL database called 'slav_photo_api'
5. Run `database/schema.sql` to create the tables
4. Run 'npm run dev'

## Environment Variables
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=slav_photo_api
JWT_SECRET=yoursecretsuperconfidentalpassword
```

## API Routes

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`

**Contacts**
- `POST /api/contacts`

**Clients**
- `GET /api/clients`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

**Photos**
- `GET /api/photos`
- `POST /api/photos`

## Todo Later
- Refractor to MVC with models 
- Add JWT to protect routes
- add DELETE/PUT for photos