import { isThisISOWeek } from "date-fns";
import today from "./today";
import { clearPage, updateMainBlockHeader, myProjects } from "..";
import { popUp } from "./home";

function checkWeek() {
    console.log(isThisISOWeek("2024-11-13"));
}

function loadThisWeek() {
    clearPage();
    updateMainBlockHeader("Tasks this week", popUp, "Task");
    myProjects.forEach(project => {
        project.displayTasks(false, true);
    })
};

document.querySelector("#thisweek").addEventListener("click", loadThisWeek);

export default checkWeek();