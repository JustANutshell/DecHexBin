var time1 = new Date();
try { var DecHexBin = require("./index.js"); } catch (e) { var DecHexBin = require("dechexbin"); }
var time2 = new Date();
var fil = function (a) { a = String(a); while (a.length < 5) { a = " " + a; } return a; }
var a = function (numberType, b) {
	var good = [];																// Errors:
	if (DecHexBin("FF", "hex", "dec") != "255") { good[good.length] = 1; }				// 1
	if (DecHexBin("1111", "bin", 8) != "17") { good[good.length] = 2; }					// 2
	try { DecHexBin("1111", "a", 8); good[good.length] = 3; } catch (e) { }					// 3
	try { DecHexBin("9", 9, 10); good[good.length] = 4; } catch (e) { }						// 4
	if (DecHexBin("1111111111111111", "bin", 16) != "FFFF") { good[good.length] = 5; }	// 5
	if (DecHexBin("1111111111111111", "bin", 10) != "65535") { good[good.length] = 6; }	// 6
	for (var a = 0; a < b; a++) {
		DecHexBin("FF", "hex", "dec", numberType);
		DecHexBin("1111", "bin", 8, numberType);
		try { DecHexBin("1111", "a", 8, numberType); } catch (e) { }
		try { DecHexBin("9", 9, 10, numberType); } catch (e) { }
		DecHexBin("1111111111111111", "bin", 16, numberType);
		DecHexBin("1111111111111111", "bin", 10, numberType);
		DecHexBin("FFFFFFFFFFFFFFFF", 16, 10, numberType);
		DecHexBin(DecHexBin(a, 10, 2, numberType), 2, 16, numberType);
		DecHexBin(DecHexBin(a * 100, 10, 2, numberType), 2, 16, numberType);
	}
	return good;
}
var b = function (a) { return "[" + a.join(",") + "]"; }
console.log("DecHexBin . . . version: " + DecHexBin.VERSION);
console.log("loading . . . . . .took:" + fil(time2 - time1) + "ms");
for (var d = 0; d < 3; d++) {
	if (typeof BigInt === "undefined") {
		console.log("Skipping BigInt test - BigInt isn't supported by your node version");
	} else {
		var time3_1 = new Date(); var c = a(BigInt, 10000); var time4_1 = new Date();
		console.log("executing (BigInt) took:" + fil(time4_1 - time3_1) + "ms | errors: " + b(c));
	}
	var time3_2 = new Date(); var c = a(Number, 10000); var time4_2 = new Date();
	console.log("executing (Number) took:" + fil(time4_2 - time3_2) + "ms | errors: " + b(c));
}