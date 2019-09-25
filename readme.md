Converter for various number systems.  
Bad coded, but hey, it works.

### Syntax
```js
DecHexBin( oldValue , oldType , newType );
```

oldType and newType can be a string ("dec", "hex", "bin") or a number like 16 (16 for hex, 10 for dec, etc)

### Example
```js
const DecHexBin=require("dechexbin");

console.log(DecHexBin("ff","hex","dec")); // 255
    
console.log(DecHexBin("1111","bin",8)); // 17
```

Send bugs to darklolcrap@gmail.com
