# App.js

Here we define(not execute) the functional of the Sidebar.

# index.js

To use a sticky footer, the footer has to be renderd in the index.js. Here is the example, our code is based on https://codesandbox.io/s/l2v2k0q7rq.

```js
ReactDOM.render(
  [<App key="1" />, <Footer key="2" />],
  document.getElementById("root")
);
```
