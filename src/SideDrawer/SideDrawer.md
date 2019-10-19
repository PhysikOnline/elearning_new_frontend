```js
initialState = { isSideDrawerOpen: false };

<div>
  {/* Button for toggeling the sidedrawer with a setState
   on a onClick event */}
  <button
    style={{
      position: "absolute",
      left: "50%"
    }}
    onClick={e =>
      setState(previousState => {
        return { isSideDrawerOpen: !previousState.isSideDrawerOpen };
      })
    }
  >
    Toggle SideDrawer
  </button>
  <SideDrawer show={state.isSideDrawerOpen} />
</div>;
```
