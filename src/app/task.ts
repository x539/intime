import { Timer, TimerJSON } from './timer';
import { Logger } from './logger.service';

export interface TaskJSON {
    title: string;
    description: string;
    timer: TimerJSON;
}

export class Task implements TaskJSON {
	title: string;
	description: string;

	timer: Timer;

	constructor(private logger: Logger, data: TaskJSON = { title: '', description: '', timer: { tracking: []} }) {
        this.title = data.title;
        this.description = data.description;
        this.timer = new Timer(logger, data.timer);
	}
}