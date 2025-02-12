// имопортируем класс для работы с localStorage
import { localStorageWork } from './local_stor.js';

// доступ к input
const inputTime = document.getElementById('input_time');

// доступ к кнопке установки таймера
const setTimeBtn = document.getElementById('set_time_btn');

// доступ к спану с оставшимися часами
const hoursLeft = document.getElementById('hours_left');

// доступ к спану с оставшимися минутами
const minutLeft = document.getElementById('minut_left');

// доступ к спану с двоеточием для добавления/удаления класса с анимацией
const colon = document.getElementById('colon');

// доступ к блоку таймера
const timerBlock = document.querySelector('.timer_block')
// доступ к блоку окончания
const endBlock = document.querySelector('.end_block')
const audio = document.getElementById('audio')

// доступ к popup
const popUp = document.getElementById('popup_bg')
// доступ к popup_btn
const popUpBtn = document.getElementById('poup_btn')

const timerTime = {
	hour: '',
	minutes: ''
}

let timer; // переменная в которой будет храниться таймер setInterval

// добавления слушателя на кнопку установки времени.
setTimeBtn.addEventListener('click', checkTime);
// добавление слушателя на кнопку в popUp
popUpBtn.addEventListener('click', function() {
	popUp.style.display = 'none'
})

let localStorTime = localStorageWork.getRecord()

if (localStorTime) {
	timerTime.hour = localStorTime.hour;
	timerTime.minutes = localStorTime.minutes;
	setInputTime() // добавляем время из localStor в инпут
	getCurrentTime() // Запускаем таймер
}

// функция проверки корректности введённого времени.
function checkTime() {
	let answer;
	inputTime.value === ''
		? answer = 'время установленно не верно'
		: answer = inputTime.value;

	if (!isNaN(answer.slice(0, 1))) {
		makeTimeFromString(answer)
	} else {
		// console.log('!!!!!!!!!!!!!!',answer) // это надо убрать!
		popUp.style.display = 'block'
	}
}

function makeTimeFromString(string) {
	let [hour, minutes] = string.split(':');
	timerTime.hour = hour;
	timerTime.minutes = minutes;
	
	// console.log(timer_time);
	getCurrentTime()
}

function getCurrentTime() {
	const date_now = new Date()
	const year = date_now.getFullYear()
	const mounth = date_now.getMonth()
	const date = date_now.getDate()

	timerTime.date_timer = new Date(year, mounth, date, timerTime.hour, timerTime.minutes);

	localStorageWork.setRecord(timerTime);
	colon.classList.add('colon_anim');
	timer = setInterval(coundown, 1000);
}

function coundown() {

	let date_now = new Date()
	let date_timer = timerTime.date_timer;

	if (date_now < date_timer) {

		let diff = (date_timer - date_now);
		let diff_hour = Math.trunc(diff / (1000 * 60 * 60));
		let diff_minut = Math.floor((diff - diff_hour * (1000 * 60 * 60)) / (1000 * 60));

		hoursLeft.textContent = diff_hour;
		minutLeft.textContent = diff_minut;

		endTimer()
		
		
	} else {
		clearInterval(timer)
		minutLeft.textContent = '0';
		colon.classList.remove('colon_anim');
		endTimer('off')
	}

}

function setInputTime() {
	inputTime.value = [timerTime.hour, timerTime.minutes].join(':')
}

function endTimer(string) {
	if(string == 'off') {
		timerBlock.style.display = 'none';
		endBlock.style.display = 'block'
		audio.play()
	} else {
		timerBlock.style.display = 'flex';
		endBlock.style.display = 'none'	
	}
}