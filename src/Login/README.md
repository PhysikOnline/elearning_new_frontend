# Login

This Login sends the username and password to the Server. Where it will be verified an returns a cookie with a session id. After a succsessfull login, it executes a function of `App.js` where it updates the login state. This login state will be passed to every component, which uses the login functionality.