Date.prototype.format = function (format = 'yy-mm-dd HH:ii:ss') {
	var o = {
		"y+": this.getFullYear(),
		"m+": this.getMonth() + 1,
		"d+": this.getDate(), //day
		"x+": '日一二三四五六'.split('')[this.getDay()],
		"H+": this.getHours(),
		"h": (this.getHours() > 12 ? '下午' : '上午') + this.getHours() % 12,
		"i+": this.getMinutes(),
		"s+": this.getSeconds(),
		"S": this.getMilliseconds()
	}
	for (var k in o) {
		var reg = new RegExp("(" + k + ")")
		if (reg.test(format)) {
			var v = o[k] + ''
			if (v.length == 1 && RegExp.$1.length < 4 && RegExp.$1.length > 1) v = '0' + v
			format = format.replace(reg, v)
		}
	}
	return format
}

Date.prototype.getNextMonth = function (gap = 1) {
	const date = new Date(this.getFullYear(), this.getMonth() + gap)
	return date
}
Date.prototype.getMonthEnd = function () {
	return new Date(this.getNextMonth() - 1e3)
}

Date.prototype.getNextDay = function (gap = 1) {
	const date = new Date(this.getFullYear(), this.getMonth(), this.getDate() + gap)
	return date
}
Date.prototype.getToday = function () {
	return this.format('yy-mm-dd 00:00:00').toDate()
}
Date.prototype.getDayEnd = function () {
	return new Date(this.getToday() * 1 + 86400e3 - 1e3)
}
Date.prototype.toISO8String = function () {
	return this.format('y-m-d HH:ii:ss')
}

String.prototype.toDate = function () {
	const arr = this.split(/\D+/);
	if (arr.length < 2) return null;
	for (const idx in arr) {
		arr[idx] = arr[idx] * 1
	}
	arr[1] = arr[1] * 1 - 1;
	return new Date(...arr)
}

String.prototype.toNiceTime = function(now, mode=1) {
	const date = this.toString().toDate()
	return date.toNiceTime(now, mode)
}
Date.prototype.toNiceTime = function(now, mode = 11) {
	const date = this
	// console.log(now, date)
	const second = (now - date) / 1e3 | 0
	if ((mode == 1 || mode == 11) && second > 0) {
		if (second < 10) return 'just now'
		if (second < 60) return (second - second % 10) + 's ago'
		if (second < 60 * 60) return Math.floor(second / 60) + 'min ago'
		if (mode == 11) {
			if (second < 86400) return Math.floor(second / 3600) + 'h ago'
			return Math.floor(second / 86400) + 'd ago'
		}
	}
	let datePart = date.format('yy-mm-dd')
	const timePart = date.format('HH:ii')
	const today = now.format('y-m-d').toDate()
	if (date.getFullYear() == now.getFullYear()) datePart = date.format('mm-dd')
	if (mode == 2) {
		return datePart
	}
	if (second < 0) {
		const nextDay = now.getNextDay()
		if (date >= nextDay && date <= nextDay.getDayEnd()) datePart = 'tomorrow'
	}
	else if (date >= today) datePart = 'today'
	else if (date >= today.getNextDay(-1)) datePart = 'yesterday'
	return timePart + ' ' + datePart
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substr(1);
}

String.prototype.cutStr = function (pre = 100, trail = 0) {
	if (this.length <= pre + trail) return this
	let txt = this.substr(0, pre) + '...'
	if (trail) txt += this.substr(-trail)
	return txt
}

if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (word, tar) {
		const reg = new RegExp(word, 'mg')
		return this.replace(reg, tar)
	}
}

Array.sortArrayBy = function (arr, key, isDesc) {
	arr.sort((a, b) => {
		return (isDesc ? -1 : 1) * (a[key] - b[key])
	})
	return arr
}