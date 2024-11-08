import "./styles.css";
import loadHomePage from "./modules/home";

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
new task("put the mango down", "this is for my winter arc", "09-11-2024", "Medium", "2");
new task("task 2", "yap yap yap yap yap", "11-12-2025", "High", "1");

const projectList = document.querySelector("#project")
for(let i = 0; i < myProjects.length; i++) {
    const project = document.createElement("option");
    project.textContent = `${myProjects.at(i).title}`;
    project.setAttribute("value", i);
    projectList.appendChild(project);
}

const popUp = document.querySelector(".popup"); 

document.querySelector("#newtask").addEventListener("click", () => {
    popUp.style.display = "flex";
})

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd);
    console.log(obj);
    new task(obj.title, obj.desc, obj.dueDate, obj.priority , obj.project);
    popUp.style.display = "none";
    loadHomePage();
})


document.querySelector(".header-title").addEventListener("click", () => {
    console.log(myProjects);
})

document.querySelector("#cancelform").addEventListener("click", () => {
    popUp.style.display = "none";
})

export default myProjects;
loadHomePage();