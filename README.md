# login_app
A minimal app where a user can sign up, log in, see a dashboard, and log out.
Stack (required):

Backend:NestJS + Prisma + PostgreSQL(Postgres viadocker-compose)
Frontend:React + TypeScript + Tailwind CSS
Requirements

Sign upwith email + password.
Password must be storedhashed(bcrypt or argon2) — never plaintext.
Signing up with an email that already exists returns a clear error.

Log inwith email + password.
On success, the server sets anhttpOnly session cookie. (JWT inside the cookie is fine — but the token lives in the cookie,notlocalStorage.)

Dashboardat/dashboard.
Minimal content is fine — “Hello {email}” is enough.
Must beprotected on the server: the API endpoint behind it returns401without a valid session. Hiding the link in the frontend doesn’t count — it will be tested withcurl.

Log out.
Clears the cookie; visiting/dashboardafterwards redirects to the login page.


Definition of done — exactly what will be checked

not done
docker compose up starts Postgres; the README takes a stranger from clone → running app
npx prisma migrate dev sets up the schema
Sign up → log in → dashboard → log out works in the browser
The password stored in the database is a hash
The dashboard API returns 401 to curl without the cookie

# my steps
# backend part
npx @nestjs/cli new backend --strict --package-manager npm

Inside backend directory:
npm install cookie-parser @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/cookie-parser @types/passport-jwt @types/bcrypt

Create .env file

Create docker-compose.yml file

Inside backend directory:
docker compose up -d
npx prisma init

Modify prisma/schema.prisma file

npx prisma migrate dev --name init

Generate modules, services, and controllers cleanly using NestJS blueprints:

npx @nestjs/cli generate module prisma
npx @nestjs/cli generate service prisma

npx @nestjs/cli generate module auth
npx @nestjs/cli generate service auth
npx @nestjs/cli generate controller auth

Create files:

src/auth/jwt.strategy.ts
src/auth/jwt-auth.guard.ts

After modification of this files start backend service:
npm run start:dev &

# frontend part
npx create-vite frontend --template react-ts

Inside frontend folder:

npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

modify tailwind.config.js

modify src/index.css:
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Inside frontend folder:

mkdir -p src/components src/pages

create files:
src/components/ProtectedRoute.tsx
src/pages/Login.tsx
src/pages/Signup.tsx
src/pages/Dashboard.tsx

Modify src/App.tsx

Modify vite.config.ts

# Start your interface frontend engine context
npm run dev
