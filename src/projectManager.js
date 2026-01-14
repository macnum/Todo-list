export default class ProjectManager {
	constructor(name) {
		this.name = name;
		this.projects = [];
		this.activeProjectId = null;
	}

	addProject(project) {
		this.projects.push(project);
		if (!this.activeProjectId) {
			this.activeProjectId = project.id;
		}
	}

	removeProject(projectId) {
		this.projects = this.projects.filter(
			(project) => project.id !== projectId
		);
		if (this.activeProjectId === projectId) {
			this.activeProjectId = this.projects[0]?.id || null;
		}
	}
	setActiveProject(projectId) {
		this.activeProjectId = projectId;
	}
	getActiveProject() {
		return this.projects.find(
			(project) => project.id === this.activeProjectId
		);
	}
}
