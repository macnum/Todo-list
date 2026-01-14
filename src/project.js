export default class Project {
	constructor(name) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.tasks = [];
	}

	addTask(task) {
		this.tasks.push(task);
	}

	removeTask(taskId) {
		this.tasks = this.tasks.filter((task) => task.id !== taskId);
	}
	getTask(taskId) {
		return this.tasks.find((task) => task.id === taskId);
	}
	updateTask(taskId, updateData) {
		const task = this.getTask(taskId);
		if (!task) return;

		Object.assign(task, updateData);
	}
}
