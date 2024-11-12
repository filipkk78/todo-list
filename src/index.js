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
        this.id = `${myProjects.length}`;
        this.title = `${title}`;
        this.tasks = [];
        myProjects.push(this);
    }
    displayTasks() {
        const mainBlock = document.querySelector(".main-block");
        function updateTaskCount(title, taskCount) {
            currentProject.textContent = `${title} (${taskCount})`;
        }
    
        const currentProject = document.createElement("h2");
        currentProject.classList.add("current-project");
        updateTaskCount(this.title, this.tasks.length);
        mainBlock.appendChild(currentProject);
    
        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        mainBlock.appendChild(tasks);

        let projectName = this.title;
        let taskList = this.tasks;

        taskList.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            
            const taskCardHeader = document.createElement("div");
            taskCardHeader.classList.add("task-card-header");
            
            const taskTitle = document.createElement("h4");
            taskTitle.textContent = task.title;
            taskCardHeader.appendChild(taskTitle);

            const deleteButton = document.createElement("div");
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                tasks.removeChild(taskCard);
                taskList.splice(taskList.indexOf(task), 1);
                console.clear();
                updateTaskCount(projectName, taskList.length);
            })

            taskCardHeader.appendChild(taskTitle);
            taskCardHeader.appendChild(deleteButton);

            taskCard.appendChild(taskCardHeader);

            const taskDesc = document.createElement("div");
            taskDesc.classList.add("task-description");
            taskDesc.textContent = task.description;
            taskCard.appendChild(taskDesc);

            const taskCardFooter = document.createElement("div");
            taskCardFooter.classList.add("task-card-footer");

            const taskPriority = document.createElement("h4");
            const taskPriorityLevel = document.createElement("span");
            taskPriorityLevel.classList.add(`priority-${task.priority}`);
            taskPriorityLevel.textContent = task.priority;
            taskPriority.textContent = "Priority: ";
            taskPriority.appendChild(taskPriorityLevel);
            taskCardFooter.appendChild(taskPriority);

            const taskDueDate = document.createElement("h4");
            taskDueDate.textContent = `Due: ${task.dueDate}`;
            taskCardFooter.appendChild(taskDueDate);   
        
            taskCard.appendChild(taskCardFooter);

            tasks.appendChild(taskCard);
    });
    }
}

function clearPage() {
    const main = document.querySelector(".main-block");
    while(main.lastElementChild) {
        main.removeChild(main.lastElementChild);
    }
}

new project("Default");
new project("Work");
new project("Home");
new task("put the mango down", "this is for my winter arc", "09-11-2024", "Medium", "0");
new task("buy stillwater", "those who know", "11-12-2025", "High", "0");
new task("put the fries in the bag", "just put the fries in the bag bro", "11-11-2024", "Low", "0");
new task("Feed the dog", "Give the dog some food", "11-11-2024", "Medium", "2");
new task("Feed the cat", "Give the cat some food", "11-11-2024", "High", "2");
new task("Clean the house", "Vaccum and wipe the floors", "14-11-2024", "Low", "2");
new task("Prepare lunch", "Make some food to eat at work", "12-11-2024", "High", "1");
new task("Finish the app", "Complete the app you were working on recently", "26-11-2024", "High", "1");
new task("Buy new clothes", "Get some new clothe for work", "15-11-2024", "Low", "1");

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

const form = document.querySelector("#taskform");
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
    console.clear();
    myProjects.forEach(project => {
        project.tasks.forEach(task => {
            console.log(task);
        })
    })
})

document.querySelector("#exitform").addEventListener("click", () => {
    popUp.style.display = "none";
    form.reset();
})

const projectPopUp = document.querySelector(".project-popup"); 

document.querySelector("#projects").addEventListener("click", () => {
    projectPopUp.style.display = "flex";
})

document.querySelector("#exitprojectform").addEventListener("click", () => {
    projectPopUp.style.display = "none";
    form.reset();
})

const pForm = document.querySelector("#project-form");
pForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(pForm);
    const obj = Object.fromEntries(fd);
    console.log(obj);
    new project(obj.projectname);
    projectPopUp.style.display = "none";
    pForm.reset();
    loadHomePage();
})

export {myProjects, clearPage}
// loadHomePage();

document.querySelector("#home").addEventListener("click", loadHomePage);