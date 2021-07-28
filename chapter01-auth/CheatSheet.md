## + + + + + + + + + + + + + +
## _ _ _ _ CHEAT SHEET _ _ _ _
## + + + + + + + + + + + + + +

# Segítség

### Az autentikációt és autorizációt a következő osztályok segítik: 

  - AuthService, 
  - JwtInterceptorService, 
  - EditorGuard, 
  - AdminGuard.

- Az egyes guard-okat, ha készen vannak, akkor az AppRoutingModule-ban vedd fel, a videókban bemutatott módon, a canActivate tömbben.

# Ebben a sorrendben dolgozz: 
  - komponensek -> 
  - routing -> 
  - authService -> 
  - jwtInterceptorService -> 
  - guard-ok.

## New Angular Project:
  - `ng new access-control`

## Bootstrap, Font-Awesome
  - `npm i bootstrap font-awesome`
```
 "styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/font-awesome/css/font-awesome.min.css",
  "src/styles.scss"
  ],
```
## Models/Classes:
  - `ng g class model/user`

## Services:
  - `ng g service service/config`
  - `ng g service service/auth`
  - `ng g service service/user`
  - `ng g service service/jwt-interceptor`

## Pages:
  - `ng g c page/nav`
  - `ng g c page/home`
  - `ng g c page/login`
  - `ng g c page/users`
  - `ng g c page/users-edit`
  - `ng g c page/forbidden`
  
## Guards:
  - `ng g service service/auth-guard`
  - `ng g service service/role-guard`

## Server: 
- `json-server-auth ./server/users.json --watch`
- `json-server-auth ./server/users.json -r ./routes.json`