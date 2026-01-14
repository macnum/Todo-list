const DOM = (() => {
	function renderProjects(projectManager) {}

	function renderTasks(project) {
		const list = document.querySelector('#task-list');

		list.innerHTML = '';
		project.tasks.forEach((task) => {
			const li = document.createElement('li');
			const checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.className = 'checked';

			checkBox.checked = task.completed;
			if (task.completed) {
				li.className = 'completed';
			}
			console.log(checkBox);
			li.dataset.id = task.id;
			const button = document.createElement('button');
			button.className = 'remove-item btn-link';
			const icon = document.createElement('i');
			icon.className = 'fa-solid fa-trash-can';

			button.appendChild(icon);
			const text = document.createTextNode(task.title);

			li.appendChild(text);
			li.appendChild(button);
			li.insertBefore(checkBox, text);
			list.appendChild(li);
			console.log(li);
		});
	}

	return { renderProjects, renderTasks };
})();

export default DOM;
