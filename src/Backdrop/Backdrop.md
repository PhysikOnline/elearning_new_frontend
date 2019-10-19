```js
initialState = { isBackdropOpen: false };

// Funcion for closing the Backdrop. This function will be
// passed as the click Prop to the Backdrop
function closeBackdrop() {
  setState({ isBackdropOpen: false });
}

// define undefined backdrop varriable, which will be defined
// as the backdrop, when state.isBackdropOpen = true
let backdrop;
if (state.isBackdropOpen) {
  backdrop = <Backdrop click={closeBackdrop} />;
}

<div>
  {/* Button for opening the backdrop with a setState
   on a onClick event */}
  <button onClick={e => setState({ isBackdropOpen: true })}>
    Open Backdrop
  </button>
  {/* Render backdrop: this will not render if backdrop is undefined */}
  {backdrop}
</div>;
```
