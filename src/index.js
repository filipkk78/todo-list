import "./styles.css";
import { loadHomePage } from "./modules/home";
import displayProjects from "./modules/projects";
import displayNotes from "./modules/notes";
import { logToday, today } from "./modules/today";
import checkWeek from "./modules/thisweek"
import { isThisISOWeek, isTomorrow, isYesterday } from "date-fns";

const mainBlock = document.querySelector(".main-block");

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

const myProjects_serialized = JSON.stringify(myProjects);
localStorage.setItem("myProjects", myProjects_serialized);
const myProjects_deserialized = JSON.parse(localStorage.getItem("myProjects"));

console.log(myProjects_deserialized);

class project {
    constructor(title) {
        this.id = `${myProjects.length}`;
        this.title = `${title}`;
        this.tasks = [];
        myProjects.push(this);
    }
    displayTasks(isToday, isThisWeek) {

        const currentProject = document.createElement("h2");

        if(isToday == false) {
        currentProject.classList.add("current-project");
        currentProject.textContent = this.title;
        mainBlock.appendChild(currentProject);
        }
    
        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        mainBlock.appendChild(tasks);

        let taskList = this.tasks;

        taskList.forEach(task => {
            if(isToday) {
                if(task.dueDate!=today) {
                    return;
                }
            }
            if(isThisWeek) {
                if(isThisISOWeek(task.dueDate) == false) {
                    return;
                }
            }
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
            if(task.dueDate==today) {
                taskDueDate.textContent = `Due: Today`;
            } else if(isTomorrow(task.dueDate)) {
                taskDueDate.textContent = `Due: Tommorow`;
            } else if(isYesterday(task.dueDate)) {
                taskDueDate.textContent = `Due: Yesterday`;
            } else {
                taskDueDate.textContent = `Due: ${task.dueDate}`;
            }
            
            taskCardFooter.appendChild(taskDueDate);   
        
            taskCard.appendChild(taskCardFooter);

            tasks.appendChild(taskCard);
    });
    }
}

const myNotes = [];

class note {
    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
        myNotes.push(this);
    }
}

function clearPage() {
    while(mainBlock.lastElementChild) {
        mainBlock.removeChild(mainBlock.lastElementChild);
    }
}

new project("Default");
new project("Work");
new project("Home");
new task("put the mango down", "this is for my winter arc", "2024-11-09", "Medium", "0");
new task("buy stillwater", "those who know", "11-12-2025", "High", "0");
new task("put the fries in the bag", "just put the fries in the bag bro", "2024-11-11", "Low", "0");
new task("Feed the dog", "Give the dog some food", "2024-11-11", "Medium", "2");
new task("Feed the cat", "Give the cat some food", "2024-11-11", "High", "2");
new task("Clean the house", "Vaccum and wipe the floors", "2024-11-14", "Low", "2");
new task("Prepare lunch", "Make some food to eat at work", "2024-11-12", "High", "1");
new task("Finish the app", "Complete the app you were working on recently", "2024-11-26", "High", "1");
new task("Buy new clothes", "Get some new clothe for work", "2024-11-13", "Low", "1");

for(let i = 1; i <= 10; i++) {
    new note(`Note ${i}`, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sapiente accusamus autem quam optio consequuntur dolores cumque labore, voluptate atque rerum animi aperiam incidunt perferendis ab esse omnis expedita libero!")
}

function updateProjectList() {
    const projectList = document.querySelector("#project")
    while(projectList.lastElementChild) {
        projectList.removeChild(projectList.lastElementChild);
    }
    for(let i = 0; i < myProjects.length; i++) {
    const project = document.createElement("option");
    project.textContent = `${myProjects.at(i).title}`;
    project.setAttribute("value", i);
    projectList.appendChild(project);
}}

document.querySelector(".header-title").addEventListener("click", () => {
    console.clear();
    myProjects.forEach(project => {
        project.tasks.forEach(task => {
            console.log(task);
        })
    })
})

function updateMainBlockHeader(text, id, btntext, button) {
    const mainBlockHeader = document.createElement("div");
    mainBlockHeader.classList.add("main-block-header")
    if (button == 0) {
        mainBlockHeader.textContent = text;
    } else {
        const mainBlockHeaderTitle = document.createElement("h1");
        mainBlockHeaderTitle.textContent = text;
        mainBlockHeader.appendChild(mainBlockHeaderTitle);
        const mainBtn = document.createElement("h1");
        mainBtn.textContent = `New ${btntext}`;
        const mainBtnWrapper = document.createElement("div");
        mainBtnWrapper.classList.add("list-item-wrapper");
        const mainBtnIcon = document.createElement("div");
        mainBtnIcon.classList.add("add-button");
        mainBtnWrapper.appendChild(mainBtnIcon);
        mainBtnWrapper.appendChild(mainBtn);
        mainBlockHeader.appendChild(mainBtnWrapper);
        mainBtnWrapper.addEventListener("click", () => {
            id.style.visibility = "visible";
        })
    }
    mainBlock.appendChild(mainBlockHeader);
}

export {myProjects, mainBlock, clearPage, updateMainBlockHeader, project, updateProjectList, task, myNotes, note};
loadHomePage();
updateProjectList();
logToday();