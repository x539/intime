import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormatHMS'
})
export class TimeFormatPipe implements PipeTransform {
    transform(t: number): any {
		let hours = Math.floor(t / (60 * 60 * 1000));
		let minutes = Math.floor(t / (60 * 1000) ) % 60;
		let secounds = Math.floor(t / 1000) % 60;

		return '' + hours + ' h ' + (minutes < 10 ? '0' : '') + minutes + ' min ' + (secounds < 10 ? '0' : '') + secounds + ' sec';
    }
}