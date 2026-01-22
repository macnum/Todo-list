import './styles.css';

import DOM from './dom.js';

import Task from './task.js';
import Project from './project.js';
import ProjectManager from './projectManager.js';

import { todayDate } from './utils.js';

const projectDialog = document.querySelector('#projectDialog');
const closeProjectDialog = document.querySelector('#closeProjectBtn');
const showProjectDialog = document.querySelector('#showProjectBtn');

const projectForm = document.querySelector('#project-form');
const projectNameInput = document.querySelector('#projectName');

const projectList = document.querySelector('#project-list');

const dialog = document.querySelector('#taskDialog');
const showDialog = document.querySelector('#showBtn');
const closeDialog = dialog.querySelector('#closeBtn');

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#dueDate');
const priorityInput = document.querySelector('#priority');
const confirmBtn = document.querySelector('#confirmBtn');

const list = document.querySelector('#task-list');

dueDateInput.min = todayDate;
let editingTaskId = null;

const savedData = localStorage.getItem('projectManager');
let projectManager;

if (savedData) {
	const data = JSON.parse(savedData);
	projectManager = new ProjectManager(data.name);

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
	projectManager = new ProjectManager('MY Projects');
	projectManager.addProject(new Project('Default'));
}
let activeProject = projectManager.getActiveProject();
DOM.renderTasks(activeProject);
DOM.renderProjects(projectManager);
// console.log(projectManager);
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

	dialog.close();
	form.reset();
}

function createProject(e) {
	e.preventDefault();
	const projectNameText = projectNameInput.value;

	const newProject = new Project(projectNameText);
	projectManager.addProject(newProject);

	projectManager.setActiveProject(newProject.id);
	activeProject = projectManager.getActiveProject();

	DOM.renderProjects(projectManager);
	DOM.renderTasks(activeProject);
	projectDialog.close();
	projectForm.reset();
	saveToLocalStorage();
}

function switchProject(e) {
	const clickedElement = e.target;

	// Check if they clicked a project item
	if (clickedElement.classList.contains('project-text')) {
		const li = clickedElement.parentElement;
		const projectId = li.dataset.id;

		// Switch to this project
		projectManager.setActiveProject(projectId);

		// Re-render everything
		activeProject = projectManager.getActiveProject();
		DOM.renderTasks(activeProject);
		DOM.renderProjects(projectManager);

		saveToLocalStorage();
	}
}
saveToLocalStorage();

function removeItem(e) {
	let clickedElement = e.target;

	if (clickedElement.parentElement.classList.contains('remove-item')) {
		const li = clickedElement.parentElement.parentElement.parentElement;
		const taskId = li.dataset.id;

		activeProject.removeTask(taskId);
		DOM.renderTasks(activeProject);
		saveToLocalStorage();
	}
}

function editItem(e) {
	let clickedElement = e.target;
	if (clickedElement.parentElement.classList.contains('edit-item')) {
		const li = clickedElement.parentElement.parentElement.parentElement;
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
		const li = clickedElement.parentElement.parentElement;
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
		const editPriorityInput = li.querySelector('.edit-priority-input');
		const newTitleText = editTitleInput.value;
		const newPriorityText = editPriorityInput.value;
		const taskId = li.dataset.id;
		activeProject.updateTask(taskId, {
			title: newTitleText,
			priority: newPriorityText,
		});
		editingTaskId = null;
		DOM.renderTasks(activeProject);
		saveToLocalStorage();
	}
}

function saveToLocalStorage() {
	const dataToSave = JSON.stringify(projectManager);
	localStorage.setItem('projectManager', dataToSave);
}

form.addEventListener('submit', createTask);
list.addEventListener('change', isCompleted);
list.addEventListener('click', removeItem);
list.addEventListener('click', editItem);
list.addEventListener('click', saveEditingItem);
list.addEventListener('click', cancelEditingItem);

showDialog.addEventListener('click', () => {
	dialog.showModal();
});
closeDialog.addEventListener('click', () => {
	dialog.close();
	form.reset();
});

showProjectDialog.addEventListener('click', () => {
	projectDialog.showModal();
});
closeProjectDialog.addEventListener('click', () => {
	projectDialog.close();
	form.reset();
});
projectForm.addEventListener('submit', createProject);
projectList.addEventListener('click', switchProject);
