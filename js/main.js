// Arjun Prakash
// noparens
// 07.30.12


toNumber = function(numArray) {

	var newArray = [];

	var floatRegex = /^\.[0-9]+|[0-9]+\.[0-9]+/

	for ( var i = 0; i < numArray.length; i++ ) { 
		if (floatRegex.test(numArray[i])) {
			console.log("float");
			newArray.push(parseFloat(numArray[i]));

		} else {
			console.log("int");
			newArray.push(parseInt(numArray[i]));
		}

	}

	//console.log(newArray);
	return newArray;

}

parseString = function(str) {

	var splitString = str.split(/([+\-\*]|\d+\.+\d*)/);
	
	//console.log(splitString);
  	return convert(splitString);

}

convert = function(tokens) {
  	
  	var converted, ops, t, _len;
	
	ops = {
		'+': function(a, b) {
	  	return a + b;
	},
		'-': function(a, b) {
	  	return a - b;
	},
		'*': function(a, b) {
	  	return a * b;
	} };

  	converted = [];
	
	for (var i = 0; i < tokens.length; i++) {
		t = tokens[i];
		if ((t.trim()).length !== 0) {
	  		if (ops[t]) {
	    		converted.push(ops[t]);
	  		} else if (!isNaN(t)) {
	    		converted.push(parseFloat(t));
	  		}
		}
	}
  
  return converted;

}

permuteProblem = function(section) {
	
	var first, op, rest, vals, refrence;
	
	if (section.length === 1) {
    	return [section[0]];
  	}
  	
  	vals = [];
  	
  	var i, j;
  	for (i = j = 1; j < section.length; i = j += 2) {
    	
    	refrence = split(section, i); 

    	first = refrence.first, op = refrence.op, rest = refrence.rest;
    	vals = [].concat(vals, cartesianProduct(permuteProblem(first), {
      		"with": permuteProblem(rest),
      		doing: op
    	}));
  	
  	}

  //console.log(vals)
  return vals;

}

split = function(section, arg) {

	return {
		first: section.slice(0, arg),
		op: section[arg],
		rest: section.slice(arg + 1)
	};

}

cartesianProduct = function(a, arg) {
	var b, op, vals, x, y;
  
  	b = arg["with"]; 
  	op = arg.doing;
  
  	vals = [];
  
  	for (var i = 0; i < a.length; i++) {
    	x = a[i];
    	for (var j = 0; j < b.length; j++) {
      		y = b[j];
      		vals.push(op(x, y));
    	}
  	}

  //console.log(vals)
  return vals;

}

removeDuplicates = function(arr) {

	var returnArray = [];

	returnArray.push(arr[0]);

	for (var i = 1; i < arr.length; i++) {
		var inArray = false; 
		for (var j = 0; j < returnArray.length; j++) {
			if (arr[i] === returnArray[j]) {
				inArray = true;
				break;
			}

		}

		if (inArray === false) {
			returnArray.push(arr[i]);
		}
	
	}

	console.log(returnArray);


}

noParens = function(expression) {
	
	if (!expression) {
		return "undefined"
	}
	var parsedStr = parseString(expression);

	var answerArray = permuteProblem(parsedStr);

	var returnArray = removeDuplicates(answerArray);

	return returnArray;

}


// TESTS
var numberString01 = "1 + 2 - 3 * 4";
var numberString02 = "1 - 1 + 1";
var numberString03 = "1 + 2 + 3 * 4 - 5 * 2";


noParens(numberString01);
noParens(numberString02);
noParens(numberString03);





