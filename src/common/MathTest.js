

class ProblemAnswerType {
	static String = 0;
	static Choise = 1;
};

/*
	Represents generic math this.
	Also loads its data from "description.json" contents.
*/
export default class MathTest {
	constructor(props) {
		if (props)
			this.loadFromDescription(props);
	}

	loadFromDescription(props) {
		this.id = props.id;
		this.title = props.title;
		this.tags = props.tags;

		this.problem = {
			text: props.problem.text,
			picture: props.problem.picture,
			answer: this._getTaskAnswer(props.problem)
		};

		this.tips = props.tips;

		this.solution = {
			text: props.problem.text,
			picture: (props.solution.picture) ? props.solution.picture : props.problem.picture,
			answer: props.solution.answer
		}
	}

	verify() {
		function _isAnswerValid(answer) {
			if (answer === undefined || answer === null)
				return true;

			if ((answer.type === ProblemAnswerType.String && typeof(answer.value) !== typeof("")) ||
				(answer.type === ProblemAnswerType.Choise && typeof(answer.value) !== typeof([])))
				return false;

			return true;
		}

		let status = {
			ok: true,
			error: null,
			invalidField: null
		};

		function setStatusError(error, field=null) {
			status.ok = false;
			status.error = error;
			status.invalidField = field;
		}

		if (!this.id) 		{ setStatusError("'id' field is not defined. It should not be defined in description.json though which means it's an internal error"); return status; }
		if (!this.title) 	{ setStatusError("'title' field is not defined"); return status; }
		if (!this.tags) 	{ setStatusError("'tags' field is not defined"); return status; }
		if (!this.problem) 	{ setStatusError("'problem' field is not defined"); return status; }
		if (!this.solution) { setStatusError("'solution' field is not defined"); return status; }

		// Check this.problem
		if (!this.problem.text) 
			{ setStatusError("'problem.text' is not defined"); return status; }
		if (!_isAnswerValid(this.problem.answer))
			{ setStatusError(`'problem.answer' is invalid (answer: ${JSON.stringify(this.problem.answer)})`); return status; }

		// Check this.tips
		if (this.tips !== undefined && this.tips !== null && typeof(this.tips) !== typeof(""))
			{ setStatusError("'tips' is invalid", this.tips); return status; }

		// Check this.solution
		if (!this.solution.text) 
			{ setStatusError("'solution.text' is not defined"); return status; }

		// Has answer in problem but not in the solution and otherwise
		if ((this.problem.answer === undefined || this.problem.answer === null) && this.solution.answer)
			{ setStatusError("'solution.answer' should not be defined because 'problem.answer' is not defined"); return status; }
		if (this.problem.answer && (this.solution.answer === undefined || this.solution.answer === null))
			{ setStatusError("'solution.answer' should be defined because 'problem.answer' is defined"); return status; }

		// solution answer doesn't match problem answer type
		if (this.problem.answer) {
			if (this.problem.answer.type === ProblemAnswerType.String) {
				if (typeof(this.solution.answer) !== typeof(""))
					{ setStatusError("'solution.answer' should be a string, because problem answer is a string", this.solution.answer); return status; }
			}
			if (this.problem.answer.type === ProblemAnswerType.Choise) {
				if (typeof(this.solution.answer) !== typeof(0))
					{ setStatusError(`'solution.answer' should be a number from 0 to ${this.problem.answer.value.length-1}, because problem answer is a choise`, this.solution.answer); return status; }
				if (this.solution.answer < 0 || this.solution.answer >= this.problem.answer.value.length-1)
					{ setStatusError(`'solution.answer' is out of range. It may take values from 0 to ${this.problem.answer.value.length-1}`, this.solution.answer); return status; }
			}
		}

		return status;
	}

	_getTaskAnswer(props) {
		let out = {
			type: (typeof(props.answer) === typeof([]) ? ProblemAnswerType.Choise : ProblemAnswerType.String),
			value: props.answer
		};
		return out;
	}

	_getTasks(props) {
		if (!props.tasks)
			return undefined;

		return props.tasks.map((task) => {
			return {
				...task,
				answer: this._getTaskAnswer(task)
			};
		});
	}
}