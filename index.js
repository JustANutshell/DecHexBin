// DecHexBin by npm: Dark_ github: JustANutshell
// https://www.npmjs.com/package/dechexbin
var VERSION="1.1.0";
var defaultFunctions={
	find:function(arr,func){if(Array.prototype.find===undefined){err("You node version doesn't support Array.prototype.find - Set require(\"dechexbin\").defaultFunctions.find to an custom function (read more on https://www.npmjs.com/package/dechexbin)");}return arr.find(func);},
	MathPow:function(c,b,numberType){var out=numberType(1);for(var a=numberType(0);a<b;a=a+numberType(1)){out=out*c;}return out;},
	defaultNumberType:Number,
};
var mainconfig=(function(){
	var mainconfig={
		nt:[
			{n:"dec",x:"10"},
			{n:"hex",x:"16"},
			{n:"bin",x:"2"},
		],
		c_a:{},
		c_b:{},
	};
	for(var a=0;a<10;a++){
		mainconfig.c_a[a]=String(a);
	}
	var b="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(var a=0;a<26;a++){
		mainconfig.c_a[10+a]=b[a];
	}
	var b=Object.keys(mainconfig.c_a);
	for(var a=0;a<b.length;a++){
		mainconfig.c_b[mainconfig.c_a[b[a]]]=b[a];
	}
	return mainconfig;
})();
var err=function(a){
	throw "DecHexBin: "+a;
}
var toDec=function(value,valuetype,numberType){
	var value=value.split('');
	var out=numberType(0);
	for(var a=0;a<value.length;a++){
		out=out+(numberType(mainconfig.c_b[value[a]])*defaultFunctions.MathPow(valuetype,numberType(value.length-1-a),numberType));
	}
	return out;
}
var fromDec=function(value,outputtype,numberType){
	value=numberType(value);
	var out="";
	var a=value;
	while(a!==numberType(0)){
		var b=a%outputtype;
		out=mainconfig.c_a[b]+out;
		a=(a-b)/outputtype;
	}
	return out===""?"0":out;
}
var getNT=function(name,numberType){
	var x=null;
	if(typeof name==="number"||typeof name==="bigint"){
		if(!Number.isInteger(name)){
			err("number system must be a String or a INTEGER (it was: "+name+")");
		}else{
			name=numberType(name);
			var y=Object.keys(mainconfig.c_a).length;
			if(name>y){
				err("the biggest number system is "+y);
			}else if(name<2){
				err("the smallest number system is 2");
			}else{
				return name;
			}
		}
	}else if(typeof name==="string"){
		name=name.toLowerCase();
		var out=defaultFunctions.find(mainconfig.nt,function(a){
			return a.n===name;
		});
		if(out===undefined){
			err("Can't find number system with name: "+name);
		}else{
			return numberType(out.x);
		}
	}else{
		err("number system must be a String or a Number (it was: "+typeof name+")");
	}
}
var checkValue=function(value,type){
	if(value===""){
		err("value was empty");
	}else{
		var a=value.split('');
		var good_=[];
		var good=true;
		for(var b=0;b<a.length;b++){
			if(!(mainconfig.c_b[a[b]]!==undefined&&mainconfig.c_b[a[b]]<type)){
				good=false;
				good_[good_.length]=a[b];
			}
		}
		if(!good){
			var allowed=[];
			var a=Object.keys(mainconfig.c_a);
			for(var b=0;b<a.length;b++){
				if(a[b]<type){
					allowed[allowed.length]=mainconfig.c_a[a[b]];
				}
			}
			err(JSON.stringify(good_)+" isn't allowed in the value (only allowed: "+JSON.stringify(allowed)+")");
		}
	}
}
var main=function(value,oldType,newType,numberType){
	if(numberType===undefined||numberType===null){numberType=defaultFunctions.defaultNumberType;}
	value=String(value).toUpperCase();
	oldType=getNT(oldType,numberType);
	newType=getNT(newType,numberType);
	var negativ=value.split('')[0]==="-";
	if(negativ){
		value=value.substring(1);
	}
	checkValue(value,oldType);
	var newValue=null;
	if(oldType===newType){
		newValue=value;
	}else if(oldType===10){
		newValue=fromDec(value,newType,numberType);
	}else if(newType===10){
		newValue=toDec(value,oldType,numberType);
	}else{
		newValue=fromDec(toDec(value,oldType,numberType),newType,numberType);
	}
	return (negativ&&newValue!=="0"?"-":"")+newValue;
}
module.exports=main;
module.exports.defaultFunctions=defaultFunctions;
module.exports.VERSION=VERSION;