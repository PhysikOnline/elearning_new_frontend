```js
initialState = { isSideDrawerOpen: false };

<div
  style={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }}
>
  {/* Button for toggeling the sidedrawer with a setState
   on a onClick event */}
  <button
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
