const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// Global variable of fruits lowercased to compare efficiently
let fruitLowerCase = [];
for (let i = 0; i < fruit.length; i++) {
	fruitLowerCase.push(fruit[i][0].toLowerCase().concat(fruit[i].substring(1, fruit.length)));
}

function search(str) {
	let results = [];
	// Lowercase fruits, match input value, return matching words as result
	let lower = str.toLowerCase();
	let	resultsLowerCase = fruitLowerCase.filter((word) => word.includes(lower));
	for (let i = 0; i < resultsLowerCase.length; i++) {
		results[i] = resultsLowerCase[i][0].toUpperCase().concat(resultsLowerCase[i].substring(1, fruit.length));
	}
	return results;
}

function searchHandler(e) {
	// Shell function
	if (input.value.length !== 0) {
		let results = search(input.value);
		// lower case input value to compare later
		let inputVal = input.value.toLowerCase();
		showSuggestions(results, inputVal);
	} else {
		let unorderedList = document.getElementsByTagName('ul')[0];
		unorderedList.innerHTML = '';
	}
}

function showSuggestions(results, inputVal) {
	// TODO display search results, bold matching text with input value
	let unorderedList = document.getElementsByTagName('ul')[0];
	unorderedList.innerHTML = '';
	// Display 5 results
	for (let i = 0; i < 5; i++) {
		// Display less than 5 if not enough results
		if (results[i]) {
			let list = document.createElement('li');
			list.innerHTML = results[i];
			// Bold if results contains lower cased input value
			let boldedText = list.innerHTML.replace(inputVal, `<b>${inputVal}</b>`);
			// Upper case first letter and compare again
			let upperInput = inputVal[0].toUpperCase().concat(inputVal.substring(1, inputVal.length));
			let boldedUpperText = boldedText.replace(upperInput, `<b>${upperInput}</b>`);
			list.innerHTML = boldedUpperText;
			unorderedList.appendChild(list);
		}
	}
}

function useSuggestion(e) {
	// When clicked, fills input with value clicked and closes search results
	input.value = e.target.innerText;
	let unorderedList = document.getElementsByTagName('ul')[0];
	unorderedList.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('mouseup', useSuggestion);