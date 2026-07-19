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