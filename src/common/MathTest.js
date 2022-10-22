

export class MathTest {
	static AnswerType = {
		String: 0,
		Choise: 1
	};

	constructor() {
		this.id = null;
		this.title = null;
		this.tags = null;
		this.problem = {
			text: null,
			picture: null,
			answer: {
				type: null,
				placeholder: null,
				choises: null
			}
		};
		this.tips = null;
		this.solution = {
			text: null,
			answer: null,
			picture: null
		};
	}
}

export function validateTest(test) {
	if (!checkFieldsPresent(test).ok) 	return checkFieldsPresent(test);
	if (!checkFieldTypes(test).ok) 		return checkFieldTypes(test);
	if (!checkTags(test).ok) 			return checkTags(test);
	if (!checkProblem(test).ok) 		return checkProblem(test);
	if (!checkSolution(test).ok) 		return checkSolution(test);
	if (!checkProblemAnswer(test).ok) 	return checkProblemAnswer(test);
	if (!checkSolutionAnswer(test).ok) 	return checkSolutionAnswer(test);

	return { errorMessage: null, ok: true };
}




function eqType(a, b) {
	return typeof(a) === typeof(b);
}

function isSet(a) {
	return a !== undefined && a !== null;
}

function checkFieldsPresent(test) {
	if (!isSet(test?.id)) 		return { ok: false, errorMessage: "'id' is undefined" };
	if (!isSet(test?.title)) 	return { ok: false, errorMessage: "'title' is undefined" };
	if (!isSet(test?.problem)) 	return { ok: false, errorMessage: "'problem' is undefined" };
	if (!isSet(test?.solution)) return { ok: false, errorMessage: "'solution' is undefined" };

	return { ok: true, errorMessage: null };
}

function checkFieldTypes(test) {
	if (!eqType(test?.id, 0)) 			return { ok: false, errorMessage: "'id' is not a number" };
	if (!eqType(test?.title, "")) 		return { ok: false, errorMessage: "'title' is not a string" };
	if (test?.title === "") 			return { ok: false, errorMessage: "'title' is defined but empty" };
	if (!eqType(test?.problem, {})) 	return { ok: false, errorMessage: "'problem' is not an object" };
	if (!eqType(test?.solution, {})) 	return { ok: false, errorMessage: "'solution' is not an object" };

	return { ok: true, errorMessage: null };
}

function checkTags(test) {
	const tags = test?.tags;

	if (isSet(tags)) {
		if (!eqType(tags, []))
			return { ok: false, errorMessage: "'tags' is not an array" };

		for (let i = 0; i < tags.length; i++) {
			if (!eqType(tags[i], ""))
				return { ok: false, errorMessage: `'tags[${i}]' is not a string` };
			if (tags[i] === "")
				return { ok: false, errorMessage: `'tags[${i}]' is empty` };
		}
	}

	return { ok: true, errorMessage: null };
}

function checkProblem(test) {
	const problem = test?.problem;

	if (!isSet(problem?.text)) 		return { ok: false, errorMessage: `'problem.text' is undefined` };
	if (problem?.text === "") 		return { ok: false, errorMessage: `'problem.text' is defined but empty` };
	if (!isSet(problem?.answer))	return { ok: false, errorMessage: `'problem.answer' is undefined` };

	if (isSet(problem?.picture)) {
		if (!eqType(problem?.picture, ""))	return { ok: false, errorMessage: `'problem.picture' is not a string` };
		if (problem?.picture === "") 		return { ok: false, errorMessage: `'problem.picture' is defined but empty` };
	}

	return { ok: true, errorMessage: null };
}

function checkSolution(test) {
	const solution = test?.solution;
	
	if (!isSet(solution?.text)) 	return { ok: false, errorMessage: `'solution.text' is undefined` };
	if (solution?.text === "") 		return { ok: false, errorMessage: `'solution.text' is defined but empty` };
	if (!isSet(solution?.answer)) 	return { ok: false, errorMessage: `'solution.answer' is undefined` };

	if (isSet(solution?.picture)) {
		if (!eqType(solution?.picture, "")) return { ok: false, errorMessage: `'solution.text' is not a string` };
		if (solution?.picture === "") 		return { ok: false, errorMessage: `'solution.picture' is defined but empty` };
	}

	return { ok: true, errorMessage: null };
}

function checkProblemAnswer(test) {
	const answer = test?.problem?.answer;

	if (!isSet(answer?.type)) return { ok: false, errorMessage: `'problem.answer.type' is undefined` };

	if (answer?.type === MathTest.AnswerType.String) {
		if (!isSet(answer?.placeholder)) 		return { ok: false, errorMessage: `'problem.answer.placeholder' is undefined` };
		if (!eqType(answer?.placeholder, ""))	return { ok: false, errorMessage: `'problem.answer.placeholder' is not a string` };
		if (answer?.placeholder === "")			return { ok: false, errorMessage: `'problem.answer.placeholder' is defined but empty` };
	}
	else if (answer?.type === MathTest.AnswerType.Choise) {
		if (!isSet(answer?.choises)) 		return { ok: false, errorMessage: `'problem.answer.choises' is undefined` };
		if (!eqType(answer?.choises, []))	return { ok: false, errorMessage: `'problem.answer.choises' is not an array` };
		
		for (let i = 0; i < answer?.choises.length; i++) {
			if (!eqType(answer?.choises[i], "")) return { ok: false, errorMessage: `'problem.answer.choises[${i}]' is not a string` };
			if (answer?.choises[i] === "") return { ok: false, errorMessage: `'problem.answer.choises[${i}]' is defined but empty` };
		}
	}

	return { ok: true, errorMessage: null };
}

function checkSolutionAnswer(test) {
	const answerType = test?.solution?.answer?.type;
	const answer = test?.solution?.answer;

	if (answerType === MathTest.AnswerType.String) {
		if (!eqType(answer, ""))	return { ok: false, errorMessage: `'solution.answer' is not a string` };
		if (answer === "") 			return { ok: false, errorMessage: `'solution.answer' is defined but empty` };
	}
	else if (answerType === MathTest.AnswerType.Choise) {
		if (!eqType(answer, 0))
			return { ok: false, errorMessage: `'solution.answer' is not a number` };
		if (answer < 0 || answer >= answer?.choises?.length)
			return { ok: false, errorMessage: `'solution.answer' is out of range [0, ${test?.problem?.answer?.choises?.length}]` };
	}

	return { ok: true, errorMessage: null };
}
