// import './styles.css';

import DOM from './dom.js';

import Task from './task.js';
import Project from './project.js';
import ProjectManager from './projectManager.js';

const modal = document.querySelector('#modal-overlay');
const showModalBtn = document.querySelector('#show-modal');
const closeModalBtn = document.querySelector('#close-modal');

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#dueDate');
const priorityInput = document.querySelector('#priority');

const list = document.querySelector('#task-list');

let editingTaskId = null;
const savedData = localStorage.getItem('projectManager');
let projectManager;
if (savedData) {
	console.log('found data', savedData);
	const data = JSON.parse(savedData);
	projectManager = new ProjectManager(data.name);
	console.log(projectManager);

	data.projects.forEach((projectData) => {
		const project = new Project(projectData.name);
		project.id = projectData.id;

		projectData.tasks.forEach((taskData) => {
			const task = new Task(
				taskData.title,
				taskData.description,
				taskData.dueDate,
				taskData.priority,
			);
			task.id = taskData.id;
			task.completed = taskData.completed;
			project.addTask(task);
		});
		projectManager.addProject(project);
	});
	projectManager.activeProjectId = data.activeProjectId;
} else {
	console.log('no saved data, creating new projectManager');
	projectManager = new ProjectManager('MY Projects');
	console.log(projectManager);
	projectManager.addProject(new Project('Default'));
}
const activeProject = projectManager.getActiveProject();
DOM.renderTasks(activeProject);

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
		priorityText,
	);

	activeProject.addTask(newTask);
	DOM.renderTasks(activeProject);
	saveToLocalStorage();
	console.log(projectManager);
}
saveToLocalStorage();
form.addEventListener('submit', createTask);
DOM.renderTasks(activeProject);

function removeItem(e) {
	let clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('remove-item')) {
		const li = clickedElement.parentElement.parentElement;
		const taskId = li.dataset.id;

		activeProject.removeTask(taskId);
		DOM.renderTasks(activeProject);
		saveToLocalStorage();
	}
}

function editItem(e) {
	let clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('edit-item')) {
		const li = clickedElement.parentElement.parentElement;
		const taskId = li.dataset.id;
		editingTaskId = taskId;
		DOM.renderTasks(activeProject, editingTaskId);

		// activeProject.updateTask(editingTaskId, updateData);
		//
	}
}
function isCompleted(e) {
	const clickedElement = e.target;
	if (clickedElement.type === 'checkbox') {
		const li = clickedElement.parentElement;
		const taskId = li.dataset.id;
		const activeTask = activeProject.getTask(taskId);
		activeTask.toggleComplete();
		DOM.renderTasks(activeProject, editingTaskId);
		saveToLocalStorage();
	}
}

function cancelEditingItem(e) {
	const clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('cancel-input')) {
		editingTaskId = null;
		DOM.renderTasks(activeProject);
	}
}
function saveEditingItem(e) {
	const clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('save-item')) {
		const li = clickedElement.parentElement.parentElement;
		const editTitleInput = li.querySelector('.edit-title-input');
		const newTitleText = editTitleInput.value;
		const taskId = li.dataset.id;
		activeProject.updateTask(taskId, { title: newTitleText });
		editingTaskId = null;
		DOM.renderTasks(activeProject);
		saveToLocalStorage();
	}
}

function saveToLocalStorage() {
	const dataToSave = JSON.stringify(projectManager);
	localStorage.setItem('projectManager', dataToSave);
	// console.log('Saved!', dataToSave);
}

list.addEventListener('change', isCompleted);
list.addEventListener('click', removeItem);
list.addEventListener('click', editItem);
list.addEventListener('click', saveEditingItem);
list.addEventListener('click', cancelEditingItem);
