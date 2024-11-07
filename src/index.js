import "./styles.css";

const myTasks = [];

class task {
    constructor(title, description, dueDate, priority, projectId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        myProjects.at(projectId).tasks.push(this);
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
new task("get 1500 vbucks", "secure the funds for perfect cell when he arrives in the fortnite store", "09-11-2024", "Max", "2")
console.log(myProjects);

const projectList = document.querySelector("#project")
for(let i = 0; i < myProjects.length; i++) {
    const project = document.createElement("option");
    project.textContent = `${myProjects.at(i).title}`;
    project.setAttribute("value", i);
    projectList.appendChild(project);
}

document.querySelector("#newtask").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "flex";
})

document.querySelector("#addtaskbtn").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
})