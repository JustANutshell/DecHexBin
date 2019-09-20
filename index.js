// DecHexBin by npm: Dark_ github: JustANutshell
// https://www.npmjs.com/package/dechexbin
module.exports=(function(){
	var mainconfig=(function(){
		var mainconfig={
			nt:[
				{n:"dec",x:10n},
				{n:"hex",x:16n},
				{n:"bin",x:2n},
			],
			c_a:{},
			c_b:{},
		};
		var b="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
		for(var a=0;a<26;a++){
			mainconfig.c_a[10+a]=b[a];
		}
		for(var a=0;a<10;a++){
			mainconfig.c_a[BigInt(a)]=String(a);
		}
		var b=Object.keys(mainconfig.c_a);
		for(var a=0;a<b.length;a++){
			mainconfig.c_b[mainconfig.c_a[b[a]]]=b[a];
		}
		return mainconfig;
	})();
	var MathPow=function(c,b){
		var out=1n;
		for(var a=0n;a<b;a=a+1n){
			out=out*c;
		}
		return out;
	}
	var toDec=function(value,valuetype){
		var value=value.split('');
		var out=0n;
		for(var a=0;a<value.length;a++){
			var b=value.length-1-a;
			out=out+(BigInt(mainconfig.c_b[value[a]])*MathPow(valuetype.x,BigInt(b)));
		}
		return out;
	}
	var fromDec=function(value,outputtype){
		var value=BigInt(value);
		var out="";
		var a=value;
		while(a!==0n){
			out=mainconfig.c_a[Number(a%outputtype.x)]+""+out;
			a=a/outputtype.x;
		}
		return out;
	}
	var getNT=function(name){
		var x=null;
		if(typeof name==="number"||typeof name==="bigint"){
			if(!Number.isInteger(Number(name))){
				throw "DecHexBin: number system must be a String or a INTEGER (it was: "+name+")";
			}
			x={n:"---",x:BigInt(name)};
		}else{
			var name=String(name).toLowerCase();
			var out=null;
			for(var a=0;a<mainconfig.nt.length&&out===null;a++){
				if(mainconfig.nt[a].n===name){
					out=mainconfig.nt[a];
				}
			}
			x=out;
		}
		if(x===null){
			return null;
		}else{
			var y=Object.keys(mainconfig.c_a).length;
			if(x.x>y){
				throw "DecHexBin: the biggest number system is "+y;
			}else if(x.x<2){
				throw "DecHexBin: the smallest number system is 2";
			}else{
				return x;
			}
		}
	}
	var checkValue=function(value,type){
		if(value===""){
			throw "DecHexBin: value was empty";
		}else{
			var a=value.split('');
			var good_=[];
			var good=true;
			for(var b=0;b<a.length;b++){
				if(!(mainconfig.c_b[a[b]]!==undefined&&mainconfig.c_b[a[b]]<type.x)){
					good=false;
					good_[good_.length]=a[b];
				}
			}
			if(!good){
				var allowed=[];
				var a=Object.keys(mainconfig.c_a);
				for(var b=0;b<a.length;b++){
					if(a[b]<type.x){
						allowed[allowed.length]=mainconfig.c_a[a[b]];
					}
				}
				throw "DecHexBin: "+JSON.stringify(good_)+" isn't allowed in the value (only allowed: "+JSON.stringify(allowed)+")";
			}
		}
	}
	var main=function(value,oldType,newType){
		var value=String(value).toUpperCase();
		var a=function(a,b,c){if(a===null){throw "DecHexBin: "+b+" ("+(typeof c)+":"+c+") isn't a number system (such as String: dec or hex or Number: 16)";}}
		var type_old=getNT(oldType);	a(type_old,"oldType",oldType);
		var type_new=getNT(newType);	a(type_new,"newType",newType);
		var a=value.split('');
		var negativ=a[0]==="-";
		if(negativ){
			value="";
			for(var b=1;b<a.length;b++){
				value=value+""+a[b];
			}
		}
		checkValue(value,type_old);
		if(type_old.x===type_new.x){
			return (negativ&&value!=="0"?"-":"")+value;
		}else{
			if(type_old.n==="dec"){
				var newValue=fromDec(value,type_new);
			}else if(type_new.n==="dec"){
				var newValue=toDec(value,type_old);
			}else{
				var newValue=main(main(value,type_old.x,"dec"),"dec",type_new.x);
			}
			return (negativ&&newValue!=="0"?"-":"")+newValue;
		}
	}
	return main;
})();