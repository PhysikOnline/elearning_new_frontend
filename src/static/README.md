# static

Here is the static contend defined.

## SVG

SVGs are imported by inserting the SVG tag into an component and attaching a class to it.

```js
function YourSVG() {
  return (
    <svg className="YourSVG" your svg props>
      your svg
    </svg>
  );
}
```

The css class in your SVG enables you to customize it later in the component you want to call the SVG. This makes use of the class inside cass definition (look it up if you don't know it, it is used for styling this whole Project [CSS Selectors](https://www.w3schools.com/CSSref/css_selectors.asp))

```css
.TopComponent .YourSVG {
    some-cool-styling: shit;
}
```
