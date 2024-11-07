import "./styles.css";

const myTasks = [];

class task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = `${myProjects.length+1}-${project}`;
        myProjects.at(this.project.at(1)).push(this);
    }
}

const myProjects = [];

class project {
    constructor(title) {
        this.id = `${myProjects.length+1}`;
        this.title = `${title}`;
        this.tasks = [];
        myProjects.push(this);
    }
}

new project("Default");
new project("Work");
new project("Home");

const projectDisplay = document.querySelector(".projects")
for(let i = 0; i < myProjects.length; i++) {
    const project = document.createElement("li");
    project.textContent = `${myProjects.at(i).title}`;
    projectDisplay.appendChild(project);
}