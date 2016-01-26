#  Tutorial D3

## First step: configuration

First of all e need to scafold a new project with the generator :

```bash
mkdir new project
cd new project
yo mcfly:module common
yo mcfly:controller common home
``` 


Then we need to download d3
```bash
npm install d3
```

To add it in the home.js controller we just have to add at the begining of the code:
```javascript
var d3 = require(d3);
```
