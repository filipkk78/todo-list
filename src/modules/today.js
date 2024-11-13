import { clearPage, updateMainBlockHeader, myProjects} from "..";
import { popUp } from "./home";

const todayRaw = new Date;

const today = todayRaw.toISOString().slice(0, 10);

function logToday() {
    console.log(today);
}

function loadToday() {
    clearPage();
    updateMainBlockHeader("Tasks due today", popUp, "Task");
    myProjects.forEach(project => {
        project.displayTasks(true, false);
    })
};

document.querySelector("#today").addEventListener("click", loadToday);

export {today, logToday}