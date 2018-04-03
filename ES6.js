// Destructuring

function calcBmi({ weight, height, max = 25, callback }) {
	var bmi = weight / Math.pow(height, 2);
	if (bmi > max) {
		console.log("you're fat");
	}
	if (callback) {
		callback(bmi);
	}
}

calcBmi({ weight, height, max: 25});

// Template Strings - use backticks, can multiline

var greet = `hi, my name is ${name} 
and I like to 
${thing}!`;

