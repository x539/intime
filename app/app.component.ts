import { Component, Input } from '@angular/core';

import { Timer } from './timer.component';

class Task {
	title: string;
	description: string;

	timer: Timer;

	constructor(title: string) {
		this.title = title;
		this.timer = new Timer();
	}
}

@Component({
	selector: 'task-detail',
	template: `
	<fieldset [disabled]='disabled' class='col-xs'>
		<div class='form-group'>
			<label for='taskTitle'>Title</label>
			<input [(ngModel)]='task.title' id='taskTitle' class='form-control' accesskey='t' />
		</div>
		<div class='form-group'>
			<label for='taskDescription'>Description</label>
			<textarea [(ngModel)]='task.description' id='taskDescription' class='form-control' accesskey='d'></textarea>
		</div>
	</fieldset>
`,
})
class TaskDetailComponent {
	@Input()
	task : Task;

	@Input()
	disabled : boolean;
}

@Component({
	selector: 'app-component',
	template: `
	<div class='row'><h1 class='col-xs display-1'>{{title}} <small class='h1 text-muted'>{{totalTimer.timeString}}</small></h1></div>
	<div class='row'><task-detail [task]='selected || emptyTask' [disabled]='selected === null'></task-detail></div>
	<form class='row form-inline'>
		<div class='col-md-1'><button class='btn btn-default' (click)='newTask()'>New Task</button></div>
		<div class='offset-md-7 col-md-4'><div class='input-group'><span class='input-group-addon'>Find</span><input class='form-control' type='search' accesskey='f'/></div></div>
	</form>
	<div class='row'><div class='col-xs'><ul class='list-group'>
		<li *ngFor='let task of tasks.slice().reverse()' class='list-group-item' [class.active]="task.timer.isActive" (click)='select(task)'><span class='col-xs-6 col-md-2'>{{task.timer.timeString}}</span><span class='col-xs'>&nbsp;{{task.title}}</span></li>
	</ul></div></div>
`,
	directives: [TaskDetailComponent],
	styles: ['.list-group-item { cursor: pointer; }'],
 })
export class AppComponent {
	title = 'TimeTracker';

	private totalTimer : Timer = new Timer();
	private tasks : Task[] = [];

	private selected : Task = null;
	private emptyTask : Task = new Task();

	titleFocused : boolean = false;

	select(task: Task) {
		if (this.selected) {
			this.selected.timer.stop();

			if (this.selected === task) {
				this.selected = null;
				this.totalTimer.stop();
				return;
			}
		}
		this.selected = task;
		task.timer.start();
		this.totalTimer.start();
	}

	newTask() {
		let task : Task = new Task("Task-" + (this.tasks.length + 1));
		this.tasks.push(task);
		this.select(task);

		this.titleFocused = true;
	}
}