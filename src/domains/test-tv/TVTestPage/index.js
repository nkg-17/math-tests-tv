import { 
	useState, 
	useEffect
} from 'react';

import TestsAPI from 'api/TestsAPI';
import { checkIsTestAnswerValid } from 'api/util';

import TestPage from 'domains/test-tv/TVTestPage/TestPage';

import TestContext from 'domains/test-tv/TVTestPage/TestContext';


export default function TVTestPage(props) {
	const [ test, setTest ] = useState(null);
	const [ answerState, setAnswerState ] = useState("neutral"); // valid, invalid, gave-up
	const [ isErrorReportOpened, setErrorReportOpened ] = useState(false);
	const [ status, setStatus ]				= useState("waiting");

	const loadTestById = (id) => {
		if (status === "waiting")
			return;

		setStatus(() => "waiting");

		setTimeout(() => {
			TestsAPI.requestTest(id)
			.then((newTest) => {
				setStatus(() => "ok");
				setTest(() => newTest);
				setAnswerState(() => "neutral");
			})
			.catch((err) => {
				console.error(err);
				setStatus(() => "failed");
				setAnswerState(() => "neutral");
			});
		}, 400);
	}

	const contextValue = {
		test: test,
		status: status,

		answerState: answerState,
		isDoneAnswering: ['valid', 'gave-up'].includes(answerState),

		isErrorReportOpened: isErrorReportOpened,
		setErrorReportOpened: setErrorReportOpened,

		submitAnswer: (answer) => setAnswerState(checkIsTestAnswerValid(test, answer) ? "valid" : "invalid"),
		openSolution: () => setAnswerState("gave-up"),
		
		loadPrevTest: () => TestsAPI.requestPrevIdFor(test.id).then((id) => loadTestById(id)),
		loadNextTest: () => TestsAPI.requestNextIdFor(test.id).then((id) => loadTestById(id)),
		loadTest: (id) => loadTestById(id)
	};

	useEffect(() => {
		TestsAPI.requestRandomId()
		.then((id) => TestsAPI.requestTest(id)).then((newTest) => {
			setStatus(() => "ok");
			setTest(() => newTest);
			setAnswerState(() => "neutral");
		}).catch((err) => {
			console.error(err);
			setStatus(() => "failed");
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
