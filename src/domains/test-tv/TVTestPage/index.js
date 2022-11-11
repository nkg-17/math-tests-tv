import { 
	useState, 
	useEffect, 
	useRef
} from 'react';

import TestsAPI from '../../../api/TestsAPI';
import Status from '../../../common/Status';

import Loading from '../../../components/Loading';
import TestPage from './TestPage';
import TestContext from './TestContext';


export default function TVTestPage(props) {
	const [ test, setTest ] = useState(null);
	const [ answerState, setAnswerState ] = useState("neutral"); // valid, invalid, gave-up
	let error	= useRef(null);
	let status 	= useRef(Status.Waiting);

	const loadTestById = (id) => {
		if (status.current === Status.Waiting)
			return;

		status.current = Status.Waiting;
		error.current = null;
		setTest(() => null);
		setAnswerState(() => "neutral");

		setTimeout(() => {
			TestsAPI.requestTest(id)
			.then((newTest) => {
				error.current = null;
				status.current = Status.Ok;
				setTest(() => newTest);
			})
			.catch((err) => {
				console.error(err);
				error.current = err;
				status.current = Status.Failed;
				setTest(() => null);
			});
		}, 100);
	}

	const contextValue = {
		test: test,
		answerState: answerState,
		doneAnswering: ['valid', 'gave-up'].includes(answerState),
		submitAnswer: (answer) => setAnswerState(answer === test.solution.answer ? "valid" : "invalid"),
		openSolution: () => setAnswerState("gave-up"),
		loadPrevTest: () => TestsAPI.requestPrevIdFor(test.id).then((id) => loadTestById(id)),
		loadNextTest: () => TestsAPI.requestNextIdFor(test.id).then((id) => loadTestById(id))
	};

	useEffect(() => {
		TestsAPI.requestRandomId()
		.then((id) => TestsAPI.requestTest(id)).then((newTest) => {
			error.current = null;
			status.current = Status.Ok;
			setTest(() => newTest);
			setAnswerState(() => "neutral");
		}).catch((err) => {
			console.error(err);
			error.current = err;
			status.current = Status.Failed;
			setTest(() => null);
			setAnswerState(() => "neutral");
		});
	}, []);

	return (
		<TestContext.Provider value={contextValue}>
			{ 
				(status.current === Status.Ok) ? (
					<TestPage />
				) : (
					<div className="mt-auto mb-auto"><Loading /></div>
				)
			}
		</TestContext.Provider>
	);
}
