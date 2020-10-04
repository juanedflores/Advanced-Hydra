### Extra Hydra Functions

To add the code to hydra you can use fetch, for example:

```javascript
fetch('https://raw.githubusercontent.com/juaneduardoflores/Hydra-AudioReactive-Functions/master/ExtraHydraFunctions.js')
    .then(response => response.text())
    .then(text => eval(text))
```

Function List:

### Visual:
#### initImg
`initImg( source, url, isVideo=false )`
```javascript
initImg(s0, "https://i.imgur.com/yOvRyS2.jpg");
src(s0).correctScale(s0).out();
```

#### FADE()
`FADE( start, target, alpha )`

### Sound:
#### HIGH()
`HIGH( audiobin, valuetrue, valuefalse )`

#### HIGHEST()
`HIGHEST( audiobin, valuetrue, valuefalse )`

#### LOWEST()
`LOWEST( audiobin, valuetrue, valuefalse )`

#### CHANGE_DIR_SCROLL()
`CHANGE_DIR_SCROLL( audiobin, time )`
