
// доступ к input
const input_time = document.getElementById('input_time');

// доступ к кнопке установки таймера
const set_time_btn = document.getElementById('set_time_btn');

// доступ к спану с оставшимися часами
const hours_left = document.getElementById('hours_left');

// доступ к спану с оставшимися минутами
const minut_left = document.getElementById('minut_left');



const current_time = {
	hour: '',
	minutes: ''
}
const timer_time = {
	hour: '',
	minutes: ''
}

let timer; // переменная в которой будет храниться таймер

// добавления слушателя на кнопку установки времени.
set_time_btn.addEventListener('click', check_time);

function check_time() {
	let answer;
	input_time.value === ''
		? answer = 'время установленно не верно'
		: answer = input_time.value;

	if (!isNaN(answer.slice(0, 1))) {
		make_time_from_string(answer)
	} else {
		console.log(answer)
	}
}

function make_time_from_string(string) {
	let [hour, minutes] = string.split(':');
	timer_time.hour = hour;
	timer_time.minutes = minutes;
	console.log(timer_time);
	timer = setInterval(get_current_time, 1000)
}

function get_current_time() {
	const date_now = new Date()
	const year = date_now.getFullYear()
	const mounth = date_now.getMonth()
	const date = date_now.getDate()

	const date_timer = new Date(year, mounth, date, timer_time.hour, timer_time.minutes);

	if (date_now < date_timer) {

		let diff = (date_timer - date_now);
		let diff_hour = Math.trunc(diff / (1000 * 60 * 60));
		let diff_minut = Math.ceil((diff - diff_hour * (1000 * 60 * 60)) / (1000 * 60));

		hours_left.textContent = diff_hour
		minut_left.textContent = diff_minut
		
	} else {
		clearInterval(timer)
		minut_left.textContent = '0';
		console.log('таймер остановлен')
	}

}