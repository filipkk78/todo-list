import { clearPage, mainBlock, myProjects, updateMainBlockHeader, project, updateProjectList } from "..";

function displayProjects() {
    clearPage();
    updateMainBlockHeader("All projects", projectPopUp, "Project");
    const projectCards = document.createElement("div");
    projectCards.classList.add("tasks");
    myProjects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = project.title;
        projectTitle.addEventListener("click", () => {
            clearPage();
            project.displayTasks();
        })
        projectCard.appendChild(projectTitle);
        projectCards.appendChild(projectCard);
    })
    mainBlock.appendChild(projectCards);
}

const projectPopUp = document.querySelector(".project-popup"); 


document.querySelector("#exitprojectform").addEventListener("click", () => {
    projectPopUp.style.visibility = "hidden";
    pForm.reset();
})

const pForm = document.querySelector("#project-form");
pForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(pForm);
    const obj = Object.fromEntries(fd);
    console.log(obj);
    new project(obj.projectname);
    projectPopUp.style.visibility = "hidden";
    pForm.reset();
    displayProjects();
    updateProjectList();
    updateStorage();
})

document.querySelector("#projects").addEventListener("click", displayProjects);

export default displayProjects;