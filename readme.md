Converter for various number systems.  
Bad coded, but hey, it works.

### Syntax
-----
```js
newValue = DecHexBin(oldValue, oldType, newType (, numberSystem));
```

`oldType` and `newType` can be a string (`"dec"`, `"hex"`, `"bin"`) or a number (`16` for hex, `10` for dec, etc).

`numberSystem` can be `Number` or `BigInt` (or something similar). By default it's `Number`.

### Example
-----
```js
var DecHexBin = require("dechexbin");

console.log(DecHexBin("ff", "hex", "dec")); // 255
    
console.log(DecHexBin("1111", "bin", 8)); // 17
```

### Other
-----
DecHexBin uses normal numbers by default. You can use BigInts by using another argument:
```js
var DecHexBin = require("dechexbin");

console.log(DecHexBin("FFFFFFFFFFFFFFFF", 16, 10, BigInt));
```

If your Node version doesn't support `Array.prototype.find`:
```js
var DecHexBin = require("dechexbin");

DecHexBin.defaultFunctions.find=function(arr,func){
	// you can put here an alternative find function
	// For example:
	for(var a=0;a<arr.length;a++){
		if(func(arr[a])){
			return arr[a];
		}
	}
	return undefined;
}
```
