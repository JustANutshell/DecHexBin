Converter for various number systems.  
Bad coded, but hey, it works.

### Syntax
-----

	DecHexBin( oldValue , oldType , newType );

oldType and newType can be a string ("dec", "hex", "bin") or a number like 16 (16 for hex, 10 for dec, etc)

### Example
-----

    const DecHexBin=require("dechexbin");
    
    var a=DecHexBin("ff","hex","dec");
    console.log(a); // 255
    
    var b=DecHexBin("1111","bin",8);
    console.log(b); // 17

Send bugs to darklolcrap@gmail.com