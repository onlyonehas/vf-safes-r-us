const unlockSafe = require(".");

describe("Suite of tests on unlockSafe", () => {
	it.each`
		user              | password
		${"Donald Trump"} | ${"Unauthorised access to safe"}
		${"Emma Watson"}  | ${"Magic Wand"}
		${"Gwynyth"}      | ${"Oscar nomination"}
		${"Queen"}        | ${"Corgi"}
		${undefined}      | ${undefined}
	`(
		'should return password of "$password" for user "$user"',
		async ({ user, password }) => {
			expect(await unlockSafe(user)).toBe(password);
		}
	);
});
