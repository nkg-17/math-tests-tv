
const ErrorList = [];

export default function getErrorList() {
	return ErrorList;
}

function ErrorHandler(error) {
	ErrorList.push(error);
}

window.addEventListener("error", ErrorHandler);