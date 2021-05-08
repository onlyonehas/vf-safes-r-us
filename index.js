/**
 * DO NOT MODIFY, I REPEAT, DO NOT MODIFY
 **/

/**
 * Gets an item from a safe
 * @param {string} password - the password for the safe
 * @returns {Promise} promise that resolves or rejects depending on whether the password is correct
 *
 */
function getItemFromSafe(password) {
	const itemsMap = {
		"10-A-w-4-878": "Magic Wand",
		"16-R-a-9-1497": "The one ring to rule them all",
		"5-N-3-441": "Corgi",
		"9-Y-d-2-643": "Apples and Pears",
		"7-H-673": "Oscar nomination",
		"12-D-l-4-860": "Chocolate Brownie",
	};
	return new Promise((resolve, reject) => {
		if (itemsMap[password]) {
			resolve(itemsMap[password]);
		} else {
			reject("Unauthorised access to safe");
		}
	});
}
/**
 * END DO NOT MODIFY
 **/

async function unlockSafe(customerName) {
	if (!customerName) return;

	let safe;
	const fullName = customerName;
	const splittledFullName = fullName.split(" ");
	const forename = splittledFullName[0];
	const surname = splittledFullName.length ? splittledFullName[1] : "";
	const forenameLength = forename.length;
	const surnameLength = surname ? surname.length : 0;

	const fullNameLength = surnameLength
		? forenameLength + surnameLength
		: forenameLength;

	const captialiseLastLetterForename = forename
		.substring(forenameLength - 1, forenameLength)
		.toUpperCase();

	const lowercaseFirstLetterSurname = surname
		? surname.substring(0, 1).toLowerCase()
		: "";

	const fullNameVowels = getNumberOfVowels(fullName);
	const totalCharacterCode = hashName(fullName);

	let password = `${fullNameLength}-${captialiseLastLetterForename}`;
	password += lowercaseFirstLetterSurname
		? `-${lowercaseFirstLetterSurname}`
		: ``;
	password += fullNameVowels > 0 ? `-${fullNameVowels}` : ``;
	password += totalCharacterCode > 0 ? `-${totalCharacterCode}` : ``;

	try {
		safe = await getItemFromSafe(password);
	} catch (e) {
		return e;
	}

	return safe;
}

const hashName = (fullName) => {
	const filteredName = removeDuplicateCharacters(fullName)
		.split(" ")
		.join("")
		.toLowerCase();
	const filteredLength = filteredName.length;

	let totalCharacterCode = 0;
	for (let i = 0; i < filteredLength; i++) {
		totalCharacterCode += filteredName.charCodeAt(i);
	}
	return totalCharacterCode;
};

const getNumberOfVowels = (fullName) => {
	const numberofVowels = fullName.match(/[aeiou]/gi);
	return numberofVowels === null ? 0 : numberofVowels.length;
};

const removeDuplicateCharacters = (fullName) => {
	let result = Array.from(fullName).reduce((output, letter) => {
		let re = new RegExp(letter, "i");
		return re.test(output) ? output : output + letter;
	}, "");

	return result;
};

module.exports = unlockSafe;
