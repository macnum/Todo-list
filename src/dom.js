const DOM = (() => {
	function renderProjects(projectManager) {}

	function renderTasks(project, editingTaskId) {
		const list = document.querySelector('#task-list');
		list.innerHTML = '';

		project.tasks.forEach((task) => {
			const li = document.createElement('li');
			li.dataset.id = task.id;
			console.log(project);
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

				li.appendChild(input);
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

				const taskText = document.createElement('span');
				taskText.className = 'task-text';
				taskText.textContent = task.title;

				leftContainer.appendChild(checkBox);
				leftContainer.appendChild(taskText);

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
