// Arjun Prakash
// noparens
// 07.30.12

//var convert, cross, dedupe, noparens, parse, permute, split, test, verify;

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

preformOperation = function(num1, num2, op) {

	var outputNumber;
	
	switch(op) {
	case "+":
		outputNumber = num1 + num2;
	  	break;
	case "-":
	  	outputNumber = num1 - num2;
	  	break;
	case "*":
	  	outputNumber = num1 * num2;
	  	break;
	case "/":
		if (num2 === 0) {
			outputNumber = 0;
		} else {
			outputNumber = num1 / num2;
		}
	  	outputNumber = num1 * num2;
	  	break;
	default:
	  	outputNumber = 0;
	}
	
	//console.log(outputNumber);
	return outputNumber;


}

polishMath = function(numArray, opArray) {
	
	var mathArray = [];
	
	var opValue = 0;
	var j = 0;

	for ( var i = 0; i < numArray.length; i++ ) { 
		mathArray.push(numArray[i])
		if (mathArray.length === 2 ) {
			opValue = preformOperation(mathArray[0], mathArray[1], opArray[j]);
			mathArray = [];
			j++;
			mathArray.push[opValue];

		}
	}

	console.log("total: " + opValue);
	return opValue;

}

permutate = function(numArray, opArray) {

	var answerArray = [];

}

noParens = function(expression) {
	
	if (!expression) {
		return "undefined"
	}

	var numberRegex = /\s\W\s/;
	var numberMatches = expression.split( numberRegex );

	var operatorRegex = /[0-9]+\s|\s[0-9]+\s|\s[0-9]+/
	var operatorMatches = expression.split( operatorRegex );

	operatorMatches.splice(0,1);
	operatorMatches.splice(operatorMatches.length-1,1);
	

	numberMatches = toNumber(numberMatches);

	if (numberMatches.length === 1) {
		return numberMatches;
	} else if(numberMatches.length === 2) {
		var arrayReturn = [];
		arrayReturn[0] = polishMath(numberMatches, operatorMatches);
		return arrayReturn;

	}


	console.log(numberMatches);
	console.log(operatorMatches);


}

noParensSecond = function(expression) {
	
	if (!expression) {
		return "undefined"
	}
	var parsedStr = parseString(expression);

	var answerArray = permuteProblem(parsedStr);

	var returnArray = removeDuplicates(answerArray);

	return returnArray;

}



var numberString01 = "1 + 2 - 3 * 4";
var numberString02 = "13 - 1";



//console.log(noParens( numberString02 ));
noParensSecond( numberString01 );

// preformOperation(1, 2, "+");
// preformOperation(1, 2, "-");
// preformOperation(1, 2, "*");
// preformOperation(1, 2, "/");
// preformOperation(1, 0, "/");
// toNumber("1");
// toNumber("134");
// toNumber(".134");
// toNumber("134.3");



