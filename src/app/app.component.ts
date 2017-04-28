import { Component, Input, OnInit, DoCheck } from '@angular/core';

import { Timer, TimerJSON } from './timer';
import { Task, TaskJSON } from './task';
import { Logger } from './logger.service';

@Component({
	selector: 'app-component',
	template: `
	<div class='row'><h1 class='col display-1'>{{title}} <small class='h1 text-muted'><tt-timer #totalTimerComponent [timer]='totalTimer'></tt-timer></small></h1></div>
	<div class='row'><task-detail class='col' [task]='selected || emptyTask' [disabled]='selected === null'></task-detail></div>
	<form class='row form-inline'>
		<div class='col-md-1'><button class='btn btn-default' (click)='newTask()'>New Task</button></div>
		<div class='offset-md-7 col-md-4'><div class='input-group'><span class='input-group-addon'>Find</span><input class='form-control' type='search' accesskey='f'/></div></div>
	</form>
	<div class='row'><div class='col'><ul class='list-group'>
		<li *ngFor='let task of tasks.slice().reverse()' class='list-group-item' [class.active]="task.timer.started" (click)='select(task); totalTimerComponent.update(); timerComponent.update()'><tt-timer [timer]='task.timer' #timerComponent></tt-timer><span class='col-xs'>&nbsp;{{task.title}}</span></li>
	</ul></div></div>
`,
	styles: ['.list-group-item { cursor: pointer; }'],
 })
export class AppComponent implements OnInit {
	title = 'TimeTracker';

	private totalTimer : Timer;
	private tasks : Task[];

	private selected : Task;
	private emptyTask : Task;

	titleFocused : boolean = false;

	constructor(private logger : Logger) {

	}

	public ngOnInit() : any {
		this.emptyTask = new Task(this.logger);
		this.totalTimer = new Timer(this.logger);
		this.load();
	}

	select(task: Task) {
		if (this.selected) {
			this.selected.timer.stop();

			if (this.selected === task) {
				this.selected = null;
				this.totalTimer.stop();
				this.store();
				return;
			}
		} else {
			this.totalTimer.start();
		}

		this.selected = task;
		task.timer.start();
		this.store();
	}

	newTask() {
		const timer = new Timer(this.logger);
		const task = new Task(this.logger);
		task.title = `Task-${this.tasks.length + 1}`;

		this.tasks.push(task);
		this.select(task);

		this.titleFocused = true;
	}

	private store() {
		localStorage.setItem('totalTime', JSON.stringify(this.totalTimer as TimerJSON));
		localStorage.setItem('tasks', JSON.stringify(this.tasks as TaskJSON[]));
	}

	private load() : void {
		try {
			const tasks : Task[] = [];
			const tasksJSON = JSON.parse(localStorage.getItem('tasks') || '[]') as TaskJSON[];

			for (const taskData of tasksJSON) {
				const curTask : Task = new Task(this.logger, taskData);

				if (curTask.timer.started) {
					this.selected = curTask;
				}

				tasks.push(curTask);
			}

			this.tasks = tasks;
		} catch (e) {
			this.logger.error(e);
		}

		try {
			const totalTimer = JSON.parse(localStorage.getItem('totalTime')) as TimerJSON;
			this.totalTimer = new Timer(this.logger, totalTimer);
		} catch (e) {
			this.logger.error(e);
			this.totalTimer = new Timer(this.logger);
		}
	}
}
