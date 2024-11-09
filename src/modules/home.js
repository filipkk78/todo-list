import myProjects from "..";

function loadHomePage() {
    const mainBlock = document.querySelector(".main-block");
    while (mainBlock.firstChild) {
        mainBlock.removeChild(mainBlock.lastChild);
    }

    function updateTaskCount() {
        let taskCount = 0;
        myProjects.forEach(project => {
            taskCount+=project.tasks.length;
        });
        currentProject.textContent = `All (${taskCount})`;
    }

    const currentProject = document.createElement("h2");
    currentProject.classList.add("current-project");
    updateTaskCount();
    mainBlock.appendChild(currentProject);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");
    mainBlock.appendChild(tasks);
    
    myProjects.forEach(project => {
        project.tasks.forEach(task => {
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
                    project.tasks.splice(project.tasks.indexOf(task), 1);
                    console.clear();
                    myProjects.forEach(project => {
                        project.tasks.forEach(task => {
                            console.log(task);
                        })
                    })
                    updateTaskCount();
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
    })
};

export default loadHomePage;