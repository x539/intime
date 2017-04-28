import { Component, Input, OnInit } from '@angular/core';

import { Timer } from './timer';

@Component({
	selector: 'tt-timer',
	template: `<span>{{time | timeFormatHMS}}</span>`
})
export class TimerComponent implements OnInit {
	@Input() private timer: Timer;

	private time: number;

	ngOnInit() {
		this.time = this.timer.time;
		this.update();
	}

	update() {
		if (this.timer.started) {
			this.time = this.timer.time;

			setTimeout(() => this.update(), 100);
		}
	}
}