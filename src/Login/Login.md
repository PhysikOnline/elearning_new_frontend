```js
initialState = { isLoginOpen: false };

// Funcion for closing the login. This function will be
// passed as the click Prop to the login
function closeLogin() {
  setState({ isLoginOpen: false });
}

// this should update the login state, which will update the the rest of the app
function fakeLoginStateUpdate() {
  alert("login updated");
}

// define undefined login varriable, which will be defined
// as the login, when state.isLoginOpen = true
let login;
if (state.isLoginOpen) {
  login = (
    <Login closeLogin={closeLogin} updateLoginState={fakeLoginStateUpdate} />
  );
}

<div>
  {/* Button for opening the login with a setState
   on a onClick event */}
  <button onClick={e => setState({ isLoginOpen: true })}>Login</button>
  {/* Render login: this will not render if login is undefined */}
  {login}
</div>;
```
