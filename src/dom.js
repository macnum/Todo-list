const DOM = (() => {
	function renderProjects(projectManager) {}

	function renderTasks(project, editingTaskId) {
		const list = document.querySelector('#task-list');

		list.innerHTML = '';
		project.tasks.forEach((task) => {
			const li = document.createElement('li');
			li.dataset.id = task.id;

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
				const checkBox = document.createElement('input');
				checkBox.type = 'checkbox';
				checkBox.className = 'checked';

				checkBox.checked = task.completed;
				if (task.completed) {
					li.className = 'completed';
				}

				const deleteButton = document.createElement('button');
				const editButton = document.createElement('button');
				deleteButton.className = 'remove-item btn-link';
				editButton.className = 'edit-item btn-link';
				const deleteIcon = document.createElement('i');
				const editIcon = document.createElement('i');
				deleteIcon.className = 'fa-solid fa-trash-can';
				editIcon.className = 'fa-solid fa-edit';

				deleteButton.appendChild(deleteIcon);
				editButton.appendChild(editIcon);
				const text = document.createTextNode(task.title);

				li.appendChild(text);
				li.appendChild(editButton);
				li.appendChild(deleteButton);
				li.insertBefore(checkBox, text);
			}
			list.appendChild(li);
			console.log(li);
		});
	}

	return { renderProjects, renderTasks };
})();

export default DOM;
