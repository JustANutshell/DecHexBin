// DecHexBin by npm: Dark_ github: JustANutshell
// https://www.npmjs.com/package/dechexbin
const VERSION = "1.2.0";
const DEFAULTCYPHER = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var knownNumberSystems = {
	"dec": 10,
	"hex": 16,
	"bin": 2,
};

function saveMathPow(c, b, numberType) {
	var out = numberType(1);
	for (var a = 0; a < b; a = a + 1) {
		out = out * c;
	}
	return out;
}

function toDec(value, numberSystem, numberType, canSkipChecks) {

	if (canSkipChecks && numberSystem == "0123456789")
		return numberType(value);

	var paraCypher = {};

	var numberSystemSize = numberSystem.length;

	for (let i = 0; i < numberSystemSize; i++) {
		paraCypher[numberSystem[i]] = i;
	}


	var value = value.split('');
	var out = numberType(0);
	for (var a = 0; a < value.length; a++) {
		var powerOfThisPosition = saveMathPow(numberType(numberSystemSize), value.length - 1 - a, numberType);

		var newValue = paraCypher[value[a]];
		if (newValue == undefined)
			throw "bad char";

		out += numberType(newValue) * powerOfThisPosition;
	}
	return out;
}
function fromDec(value, numberSystem, numberType) {
	if (numberSystem == "0123456789")
		return String(value);

	var numberSystemSize = numberType(numberSystem.length);

	var out = "";
	var a = value;
	while (a !== numberType(0)) {
		var b = a % numberSystemSize;
		out = numberSystem[b] + out;
		a = (a - b) / numberSystemSize;
	}
	return out === "" ? numberSystem[0] : out;
}

function getDefaultCypherForLength(length) {
	if (length > DEFAULTCYPHER.length) {
		err("the biggest number system is " + DEFAULTCYPHER.length);
	} else if (length < 2) {
		err("the smallest number system is 2");
	} else {
		return DEFAULTCYPHER.slice(0, length);
	}
}

function getNT(name) {
	if (typeof name === "number" || typeof name === "bigint") {
		name = Number(name);
		if (!Number.isInteger(name))
			throw "number system must be a String or a INTEGER (it was: " + name + ")";

		return getDefaultCypherForLength(name);

	} else if (typeof name === "string") {
		if (name.length == 0)
			throw "number system is an empty string";

		if (name[0] == "#") { // it's a cypher
			return name.slice(start = 1);
		} else { // it's the name of a numer system
			name = name.toLowerCase();
			numerSystemLength = knownNumberSystems[name];

			if (numerSystemLength == undefined || numerSystemLength == null)
				throw "Can't find number system with name: " + name;

			return getDefaultCypherForLength(numerSystemLength);

		}
	} else {
		err("number system must be a String or a Number (it was: " + typeof name + ")");
	}
}

function main(value, oldType, newType, numberType = null, canSkipChecks = true) {
	if (numberType === undefined || numberType === null) { numberType = Number; }
	value = String(value);

	oldType = getNT(oldType);
	newType = getNT(newType);

	var negativ = value[0] === "-";
	if (negativ) {
		value = value.substring(1);
	}

	var decValue = toDec(value, oldType, numberType, canSkipChecks);
	var newValue = fromDec(decValue, newType, numberType, canSkipChecks);

	return (negativ && newValue !== newType[0] ? "-" : "") + newValue;
}
module.exports = main;
module.exports.VERSION = VERSION;