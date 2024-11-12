import {myProjects, clearPage} from "..";

function loadHomePage() {
    clearPage();
    myProjects.forEach(project => {
        project.displayTasks();
    })
};

export default loadHomePage;