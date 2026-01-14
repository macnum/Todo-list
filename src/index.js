// import './styles.css';

import DOM from './dom.js';

import Task from './task.js';
import Project from './project.js';
import ProjectManager from './projectManager.js';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#dueDate');
const priorityInput = document.querySelector('#priority');

const list = document.querySelector('#task-list');

const projectManager = new ProjectManager('MY Projects');
projectManager.addProject(new Project('Default'));
const activeProject = projectManager.getActiveProject();
console.log(activeProject);

function createTask(e) {
	e.preventDefault();
	const titleText = titleInput.value;
	const descriptionText = descriptionInput.value;
	const dueDateText = dueDateInput.value;
	const priorityText = priorityInput.value;

	const newTask = new Task(
		titleText,
		descriptionText,
		dueDateText,
		priorityText
	);

	activeProject.addTask(newTask);
	DOM.renderTasks(activeProject);
}

form.addEventListener('submit', createTask);
DOM.renderTasks(activeProject);

function removeItem(e) {
	let clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('remove-item')) {
		const li = clickedElement.parentElement.parentElement;
		const taskId = li.dataset.id;

		activeProject.removeTask(taskId);
		DOM.renderTasks(activeProject);
	}
}
function isCompleted(e) {
	const clickedElement = e.target;
	if (clickedElement.type === 'checkbox') {
		const li = clickedElement.parentElement;
		const taskId = li.dataset.id;
		const activeTask = activeProject.getTask(taskId);
		activeTask.toggleComplete();
		DOM.renderTasks(activeProject);
	}
}

list.addEventListener('change', isCompleted);
list.addEventListener('click', removeItem);
