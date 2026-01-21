import getDateLabel from './utils.js';
console.log(getDateLabel(new Date().toISOString().slice(0, 10)));
console.log(getDateLabel('2026-01-22'));
console.log(getDateLabel('2026-01-20'));
const DOM = (() => {
	function renderProjects(projectManager) {}

	function renderTasks(project, editingTaskId) {
		const list = document.querySelector('#task-list');
		list.innerHTML = '';

		project.tasks.forEach((task) => {
			const li = document.createElement('li');
			li.dataset.id = task.id;
			if (project.tasks.length === 0) {
				const emptyState = document.createElement('div');
				emptyState.className = 'empty-state';
				emptyState.innerHTML = `
      <i class="fa-solid fa-clipboard-list"></i>
      <p>No tasks yet. Click "Add task" to create one!</p>
    `;
				list.appendChild(emptyState);
				console.log(emptyState);
				return;
			}

			if (task.id === editingTaskId) {
				console.log('This task is being edited:', task.title);
				const input = document.createElement('input');
				input.type = 'text';
				input.className = 'edit-title-input';
				input.value = task.title;

				const select = document.createElement('select');
				const optionsArray = ['Low', 'Medium', 'High', 'Critical'];

				for (let i = 0; i < optionsArray.length; i++) {
					const option = document.createElement('option');
					option.value = optionsArray[i]; // Set the value attribute
					option.textContent = optionsArray[i]; // Set the display text
					select.appendChild(option);
				}
				select.className = 'edit-priority-input';
				select.value = task.priority;

				li.appendChild(input);
				li.appendChild(select);
				const cancelButton = document.createElement('button');
				const saveButton = document.createElement('button');
				cancelButton.className = 'cancel-input btn-link';
				saveButton.className = 'save-item btn-link';
				const cancelIcon = document.createElement('i');
				const saveIcon = document.createElement('i');
				cancelIcon.className = 'fa-solid fa-cancel';
				saveIcon.className = 'fa-solid fa-save';

				cancelButton.appendChild(cancelIcon);
				saveButton.appendChild(saveIcon);
				li.appendChild(saveButton);
				li.appendChild(cancelButton);
				console.log(input);
			} else {
				const leftContainer = document.createElement('div');
				leftContainer.className = 'task-left';

				const checkBox = document.createElement('input');
				checkBox.type = 'checkbox';
				checkBox.className = 'task-checkbox';
				checkBox.checked = task.completed;

				const leftColumnContainer = document.createElement('div');
				leftColumnContainer.className = 'column-left';

				const taskText = document.createElement('span');
				taskText.className = 'task-text';
				taskText.textContent = task.title;

				const priority = document.createElement('span');
				priority.className = 'task-priority';
				priority.textContent = task.priority;

				switch (task.priority) {
					case 'Critical':
						priority.textContent = 'p0';
						li.className = 'red-border rounded-left';
						priority.className = 'red priority-text';
						break;
					case 'High':
						priority.textContent = 'p1';
						li.className = 'orange-border rounded-left';
						priority.className = 'orange priority-text';
						break;
					case 'Medium':
						priority.textContent = 'p2';
						li.className = 'green-border rounded-left';
						priority.className = 'green priority-text';
						break;
					case 'Low':
						priority.textContent = 'p3';
						li.className = 'blue-border rounded-left';
						priority.className = 'blue priority-text';
						break;
				}
				console.log(task.dueDate);
				const taskDate = document.createElement('span');
				taskDate.className = 'task-date';

				if (task.dueDate === '') {
					taskDate.textContent = 'No date';
				} else {
					taskDate.textContent = getDateLabel(task.dueDate);
				}

				leftColumnContainer.appendChild(taskText);
				leftColumnContainer.appendChild(taskDate);

				leftContainer.appendChild(checkBox);
				leftContainer.appendChild(leftColumnContainer);
				leftContainer.appendChild(priority);

				const rightContainer = document.createElement('div');
				rightContainer.className = 'task-actions';

				const editButton = document.createElement('button');
				editButton.className = 'edit-item btn-link';
				const editIcon = document.createElement('i');
				editIcon.className = 'fa-solid fa-edit';
				editButton.appendChild(editIcon);

				const deleteButton = document.createElement('button');
				deleteButton.className = 'remove-item btn-link';
				const deleteIcon = document.createElement('i');
				deleteIcon.className = 'fa-solid fa-trash-can';
				deleteButton.appendChild(deleteIcon);

				rightContainer.appendChild(editButton);
				rightContainer.appendChild(deleteButton);

				li.appendChild(leftContainer);
				li.appendChild(rightContainer);

				if (task.completed) {
					li.className = 'completed';
				}
			}
			list.appendChild(li);
		});
		const taskCountElement = document.querySelector('#task-count');
		if (taskCountElement) {
			taskCountElement.textContent = project.tasks.length;
		}
	}

	return { renderProjects, renderTasks };
})();

export default DOM;
