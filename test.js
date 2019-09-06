const DecHexBin=require("./index.js"); // require("dechexbin");

var a=DecHexBin("ff","hex","dec");
console.log(a); // 255

var b=DecHexBin("1111","bin",8);
console.log(b); // 17
