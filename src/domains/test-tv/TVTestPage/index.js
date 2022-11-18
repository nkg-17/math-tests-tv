import { 
	useState, 
	useEffect, 
	useRef
} from 'react';

import TestsAPI from '../../../api/TestsAPI';

import TestPage from './TestPage';

import TestContext from './TestContext';


export default function TVTestPage(props) {
	const [ test, setTest ] = useState(null);
	const [ answerState, setAnswerState ] = useState("neutral"); // valid, invalid, gave-up
	const [ isErrorReportOpened, setErrorReportOpened ] = useState(false);
	let status 	= useRef("waiting");

	const loadTestById = (id) => {
		if (status.current === "waiting")
			return;

		status.current = "waiting";
		setAnswerState(() => "neutral");

		setTimeout(() => {
			TestsAPI.requestTest(id)
			.then((newTest) => {
				status.current = "ok";
				setTest(() => newTest);
			})
			.catch((err) => {
				console.error(err);
				status.current = "failed";
				setTest(() => null);
			});
		}, 400);
		
	}

	const contextValue = {
		test: test,
		status: status.current,

		answerState: answerState,
		doneAnswering: ['valid', 'gave-up'].includes(answerState),

		isErrorReportOpened: isErrorReportOpened,
		setErrorReportOpened: setErrorReportOpened,

		submitAnswer: (answer) => setAnswerState(answer === test.solution.answer ? "valid" : "invalid"),
		openSolution: () => setAnswerState("gave-up"),
		
		loadPrevTest: () => TestsAPI.requestPrevIdFor(test.id).then((id) => loadTestById(id)),
		loadNextTest: () => TestsAPI.requestNextIdFor(test.id).then((id) => loadTestById(id))
	};

	useEffect(() => {
		TestsAPI.requestRandomId()
		.then((id) => TestsAPI.requestTest(id)).then((newTest) => {
			status.current = "ok";
			setTest(() => newTest);
			setAnswerState(() => "neutral");
		}).catch((err) => {
			console.error(err);
			status.current = "failed";
			setTest(() => null);
			setAnswerState(() => "neutral");
		});
	}, []);

	return (
		<TestContext.Provider value={contextValue}>
			<TestPage />
		</TestContext.Provider>
	);
}
