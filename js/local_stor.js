
class local_stor {
	constructor(name) {
		this.name = name
	}
	set_record(data) {
		localStorage.setItem(this.name, this._get_string(data))
	}
	get_record() {
		return this._check_writer(this.name)
			? this._get_parse(localStorage.getItem(this.name))
			: false
	}

	_check_writer(name) {
		let answer;
		try {
			localStorage.getItem(name);
			answer = true;
		} catch {
			answer = false;
		}
		return answer
	}
	_get_string(data) {
		return JSON.stringify(data)
	}
	_get_parse(data) {
		return JSON.parse(data)
	}
}

export const local_storage_work = new local_stor('timer_record')