To add the code to hydra use fetch, for example:

```javascript
fetch('https://raw.githubusercontent.com/juaneduardoflores/Hydra-AudioReactive-Functions/master/ExtraHydraFunctions.js')
    .then(response => response.text())
    .then(text => eval(text))
```
