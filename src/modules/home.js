import {myProjects, clearPage, mainBlock, updateMainBlockHeader, task} from "..";

function loadHomePage() {
    clearPage();
    updateMainBlockHeader("All tasks", popUp, "Task");
    myProjects.forEach(project => {
        project.displayTasks(false, false);
    })
};

document.querySelector("#exitform").addEventListener("click", () => {
    popUp.style.visibility = "hidden";
    form.reset();
})

const popUp = document.querySelector(".popup"); 

const form = document.querySelector("#taskform");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd);
    console.log(obj);
    new task(obj.title, obj.desc, obj.dueDate, obj.priority , obj.project);
    popUp.style.visibility = "hidden";
    loadHomePage();
    updateStorage();
})

document.querySelector("#home").addEventListener("click", loadHomePage);

export {popUp, loadHomePage};