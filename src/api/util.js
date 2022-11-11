import { MathTest } from '../common/MathTest'; 


export default function createTestFromDesc(desc) {
	let test = new MathTest();

	test.id = desc.id;
	test.title = desc.title;
	test.tags = desc.tags;

	test.problem.text = desc?.problem?.text;
	if (desc?.problem?.answer) {
		if (typeof(desc?.problem?.answer) === typeof("")) {
			test.problem.answer.type = MathTest.AnswerType.String;
			test.problem.answer.placeholder = desc?.problem?.answer;
		}
		else {
			test.problem.answer.type = MathTest.AnswerType.Choise;
			test.problem.answer.choises = desc?.problem?.answer;
		}
	}

	test.tips = desc?.problem?.tips;

	test.solution.text = desc?.solution?.text;
	if (test.problem.answer.type === MathTest.AnswerType.Choise) {
		test.solution.answer = parseInt(desc?.solution?.answer);
	}
	else {
		test.solution.answer = desc?.solution?.answer;
	}

	return test;
}