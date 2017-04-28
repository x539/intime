import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
    public error(...args) {
        console.log('ERROR:', ...args);
    }

    public debug(...args) {
        console.log('DEBUG:', ...args);
    }
}