import { Component } from '@angular/core';

@Component({
	selector: 'timer',
	template: `
		<span>{{timeString}}</span>
`
})
export class Timer {
	trackedTime : number;

	private currentStart : number;

	private hours : number;
	private minutes : number;
	private secounds : number;

	private timeString : string = '0 h 00 min 00 sec';

	isActive : boolean;

	private _timer : any;

	constructor() {
		this.trackedTime = 0;
		this.isActive = false;
	}

	public start() : void {
		let self = this;

		if (self.isActive)
			return;

		self.isActive = true;
		self.currentStart = new Date().getTime();

		self._timer = setInterval(() => { self.update(); }, 1000);
	}

	public stop() : void {
		if (this.isActive) {
			this.trackedTime = this.time();
			clearInterval(this._timer);
			this.isActive = false;
		}

		this.update();
	}

	private time() : number {
		return this.trackedTime + (this.isActive ? new Date().getTime() - this.currentStart : 0);
	}

	private update() : void {
		let t = this.time();
		this.hours = Math.floor(t / (60 * 60 * 1000));
		this.minutes = Math.floor(t / (60 * 1000) ) % 60;
		this.secounds = Math.floor(t / 1000) % 60;

		this.timeString = '' + this.hours + ' h ' + (this.minutes < 10 ? '0' : '') + this.minutes + ' min ' + (this.secounds < 10 ? '0' : '') + this.secounds + ' sec';
	}
}
