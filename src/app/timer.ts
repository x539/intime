import { Logger } from './logger.service';

interface TimeSpan {
    start: number;
    stop: number;
}

export interface TimerJSON {
    started?: number;
    tracking: TimeSpan[];
}

export class Timer implements TimerJSON {
    private trackedTime: number = 0;

    started: number;
    tracking: TimeSpan[] = [];

    constructor(private logger: Logger, data: TimerJSON = { tracking: [] }) {
        this.started = data.started;
        this.tracking = data.tracking;

        for(const timeSpan of this.tracking) {
            this.trackedTime += timeSpan.stop - timeSpan.start;
        }
    }

    public start() : void {
        if (!this.started) {
            this.started = Date.now();
        } else {
            this.logger.debug('Ignored start() on already runnig timer.');
        }
    }

    public stop() : void {
        if (this.started) {
            const timeSpan = {start: this.started, stop: Date.now()};
            this.started = undefined;
            this.tracking.push(timeSpan);
            this.trackedTime += timeSpan.stop - timeSpan.start;
        } else {
            this.logger.debug('Ignoring stop() on an inactive timer.');
        }
    }

    public get time() : number {
        if (this.started) {
            return this.trackedTime + Date.now() - this.started;
        }

        return this.trackedTime;
    }
}