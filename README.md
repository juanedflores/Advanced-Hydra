To add the code to hydra evaluate this line:

```javascript
fetch('https://raw.githubusercontent.com/juaneduardoflores/Hydra-AudioReactive-Functions/master/AudioReactivity.js')
    .then(response => response.text())
    .then(text => eval(text))
```
