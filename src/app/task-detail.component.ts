import { Component, Input } from '@angular/core';

import { Task } from './task';

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
export class TaskDetailComponent {
	@Input()
	task : Task;

	@Input()
	disabled : boolean;
}