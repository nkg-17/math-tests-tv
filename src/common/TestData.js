

/*
	Represents generic math test.
	Also loads its data from "description.json" contents.
*/
class MathTest {
	static Layout = { SinglePanel, DoublePanel, FullscreenDoublePanel };
	static AnswerType = { String, Choise };

	constructor(props) {
		loadFromRaw(props);
	}

	loadFromRaw(props) {
		this.layout = _getLayout(props);
		this.title = props.title;
		this.tags = props.tags;

		this.problem = {
			text: props.problem.text,
			picture: props.problem.pictureUrl,
			answer: _getProblemAnswer(props) //,
			// tasks: props.problem.tasks
		};

		this.solution = {
			//
		}
	}

	_getLayout(props) {
		switch (props.layout) {
			case "single-panel":
				return Layout.SinglePanel;

			case "double-panel":
				return Layout.DoublePanel;

			case "double-panel-fullscreen":
				return Layout.FullscreenDoublePanel;

			default:
				console.error("unreachable code");
		}
	}

	_getProblemAnswer(props) {
		return {
			type: (props.problem.length ? AnswerType.Choise : AnswerType.String),
			value: props.problem.answer
		};
	}
}