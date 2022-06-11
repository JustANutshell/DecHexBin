Converter for various number systems.  

### Syntax
-----
```js
newValue = DecHexBin(oldValue, oldType, newType, [numberSystem]);
```

`oldType` and `newType` can be
a string (`"dec"`, `"hex"`, `"bin"`) or 
a number (`16` for hex, `10` for dec, etc) or
a cypher (`"#0123456789"`, the hashtag is required)

`numberSystem` can be `Number` or `BigInt` (or something similar). By default it's `Number`.

Warning: The default cypher uses uppercase letters, i.e. use `FF` instead of `ff`

### Example
-----
```js
var DecHexBin = require("dechexbin");

console.log(DecHexBin("FF", "hex", "dec")); // 255
    
console.log(DecHexBin("1111", "bin", 8)); // 17

console.log(DecHexBin("3120434303123", 5, "#Kartoffelsalat")); // ellfsarf
```

### Other
-----
DecHexBin uses normal numbers by default. You can use BigInts by using another argument:
```js
var DecHexBin = require("dechexbin");

console.log(DecHexBin("FFFFFFFFFFFFFFFF", 16, 10, BigInt));
```
