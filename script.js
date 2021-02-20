const recordStartBtn = document.getElementById('startRecordId');
const recordStopBtn = document.getElementById('stopRecordId');
const recordDownloadBtn = document.getElementById('downloadRecordId');
const recorPlayBtn = document.getElementById('playRecordId');
let mediaRecoder;
recordIngStarted = false;
let recodedChunks = [];
let options = {
	audio: true,
};

function startRecording() {
	recordStartBtn.setAttribute('disabled', true);
	recordDownloadBtn.disabled = true;
	recorPlayBtn.disabled = true;
	recordStopBtn.disabled = false;
	navigator.mediaDevices.getUserMedia(options).then((stream) => {
		storeTheStream(stream);
	});
}
function storeTheStream(stream) {
	mediaRecoder = new MediaRecorder(stream);
	mediaRecoder.start();
	mediaRecoder.addEventListener('dataavailable', (event) => {
		recodedChunks.push(event.data);
	});
}
function stopRecording() {
	recordStartBtn.disabled = false;
	recordStopBtn.disabled = true;
	recordDownloadBtn.disabled = false;
	recorPlayBtn.disabled = false;
	mediaRecoder.stop();
}
function saveRecording() {
	const url = getBlobUrl();
	const randNum = generateRandomNumber();
	const a = document.createElement('a');
	a.href = url;
	a.download = `${randNum}_recorded_by_prabhu.webm`;
	a.click();
}

function playRecording() {
	const url = getBlobUrl();
	const audio = new Audio(url);
	audio.play();
}
function getBlobUrl() {
	const recordedBlob = new Blob(recodedChunks, { type: 'audio/webm' });
	const url = URL.createObjectURL(recordedBlob);
	return url;
}
function generateRandomNumber() {
	const randNum = Math.floor(Math.random() * 100000) + 100;
	return randNum;
}
