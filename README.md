# Node OAuth 2.0 Tutorial

### Install
```
npm install ejs express

npm install passport passport-google-oauth20

npm install mongoose

npm install cookie-session
```

### To Run
`npm start`

### The OAuth 2.0 Authorization Code Flow

Authentication with Goole+:

  1. User authenticates with Google (username, password), and Google returns auth_code
  2. Browser sends auth_code, Node Server then sends (auth_code, clientId, clientSecret) 
     and {scope: ['profile']} to google
  3. Google validates (auth_code, clientId, clientSecret), then returns access_token, and profile in callback
  4. Google redirects the request to redirect_url