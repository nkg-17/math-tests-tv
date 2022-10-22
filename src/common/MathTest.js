

class TestAnswerType {
	static String = 0;
	static Choise = 1;
};

/* Represents generic math this. */
export class MathTest {
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

export function isTestValid(test) {
	if (!checkFieldsPresent(test)) return false;
	if (!checkFieldTypes(test)) return false;
	if (!checkProblemSolutionStructure(test?.problem)) return false;
	if (!checkProblemSolutionStructure(test?.solution)) return false;
	if (!checkProblemSolutionStructure(test)) return false;
	if (!checkProblemAnswer(test)) return false;
	if (!checkSolutionAnswer(test)) return false;

	return true;
}


function eqType(a, b) {
	return typeof(a) === typeof(b);
}

function isSet(a) {
	return a !== undefined && a !== null;
}

function checkFieldsPresent(test) {
	if (!isSet(test?.id)) return false;
	if (!isSet(test?.title)) return false;
	if (!isSet(test?.problem)) return false;
	if (!isSet(test?.solution)) return false;

	return true;
}

function checkFieldTypes(test) {
	if (!eqType(test?.id, 0)) return false;
	if (!eqType(test?.title, "")) return false;
	if (!eqType(test?.tags, [])) return false;
	if (!eqType(test?.problem, {})) return false;
	if (!eqType(test?.solution, {})) return false;

	return true;
}

function checkProblemSolutionStructure(obj) {
	if (!isSet(obj?.text)) return false;
	if (!isSet(obj?.answer)) return false;
	if (!isSet(obj?.answer?.type)) return false;

	if (isSet(obj?.picture))
		if (!eqType(obj?.picture, "")) return false;

	return true;
}

function checkProblemAnswer(test) {
	const answer = test?.problem?.answer;

	if (answer?.type === TestAnswerType.String) {
		if (!isSet(answer?.placeholder)) return false;
		if (!eqType(answer?.placeholder, "")) return false;
	}
	else if (answer?.type === TestAnswerType.Choise) {
		if (!isSet(answer?.choises)) return false;
		if (!eqType(test?.answer?.choises, [])) return false;
		
		for (let choise of test?.answer?.choises)
			if (!eqType(choise, "")) return false;
	}

	return true;
}

function checkSolutionAnswer(test) {
	const answerType = test?.solution?.answer?.type;
	const answer = test?.solution?.answer;

	if (answerType === TestAnswerType.String) {
		if (!eqType(answer, "")) return false;
	}
	else if (answerType === TestAnswerType.Choise) {
		if (!eqType(answer, 0)) return false;
		if (answer < 0 || answer >= test?.problem?.answer?.choises?.length) return false;
	}

	return true;
}