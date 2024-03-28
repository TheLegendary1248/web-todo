import van from "vanjs-core"
import "./style.css"
/** Form for a Task
 * @typedef {Object} TaskObj
 * @property {string} text
 * @property {number} weight
 * @property {[TaskObj]} task - Indicator if completed or has nested tasks
 */
/** Form for a Set
 * @typedef {Object} SetObj
 * @property {string} title 
 * @property {[TaskObj]} task
 */
/** @type {SetObj} */
let dummy = 
{
    title: "Hello World",
    task: [
        {
            text:"Do dishes",
            task: false,
            weight: 2
        },
        {
            text: "Cook",
            task: [
                {
                    text: "Eggs",
                    task: true,
                },
                {
                    text: "Bacon",
                    task: false,
                    weight: 4
                }
            ],
        },
        {
            text: "Die from doing this challenge",
            task: true
        }
    ]
}
const { div, input, span, button,textarea} = van.tags
const title = van.state("TITLE")
/** Common elements of the TopLayer and TaskElement */
const TaskContainer = (parentObject, total) => {
    let tasks = parentObject.task
    let nestedtasks = div({class: "nested"}, typeof tasks == "object" ? tasks.map(x => TaskElem(x,total)) : []);
    return div({class: "task-container"},
        nestedtasks,
        AddTaskToLayerButton(nestedtasks, parentObject),
        ProgressBar(total)
    )
}
const AutoSave = () => {
    localStorage.setItem("test", JSON.stringify(dummy))
}
const TaskDefaults = { weight: 1, text: "", task: false}
const TaskNestedDefaults = { text: "", task: []}
const TaskElem = (task, total) => {
    if(typeof task.task == "boolean" | task.task == undefined) //Ensure object is valid (cuz im stupid myself)
    {
        //This funny stuff is here because we want 'task' itself to take precedence
        //The spread op can't be used alone because we need the ref to task intact
        Object.assign(task, {...TaskDefaults, ...task}) 
    }
    else { // Nested
        Object.assign(task, {...TaskNestedDefaults, ...task}) 
    }
    const text = van.state(task.text)
    const weight = van.state(task.weight)
    const deleted = van.state(false)
    if(task.weight != undefined){
        total.val += task.weight
    }
    van.derive(() => {
        console.log("weight was changed", weight.val)
        
        //Logic for recalc here
    })
    van.derive(() => {
        console.log("deleted was changed", deleted.val)
        if(!deleted.val){
            //This task was deleted
        }
    })
    let leafTaskCtrls = div({class: "leaf-task-ctrls"},
        input({type:"checkbox"}),
        input({type:"number",placeholder:"weight", min: 0, value: weight, oninput: e => weight.val = e.target.value}),
        
    )
    return () => deleted.val ? null : div({class: "task"},
        textarea(
            {placeholder:"Theres no text here", 
            value: text, 
            onchange: e => {let elem = e.target; text.val = elem.value; },
            oninput: e => {let elem = e.target; elem.style.height = ""; elem.style.height = elem.scrollHeight + "px"}
        }),
        leafTaskCtrls,
        button({onclick: () => {deleted.val = true; console.log("heyo")}}, "DELETE"),
        TaskContainer(task,total)
        )
}
/** @param {Array} taskArr */
const TopLayer = (setObject) => {
    let total = van.state(0)
    let title = van.state(setObject.title)
    let dom = div({id:"toplayer"},
        input({oninput: (e) => {title.val = e.target.value}, 
        value: title, id:"title"}),
        TaskContainer(setObject, total)
    )
    return dom
}
/** The Bar that shows the completeness of the current parent task */
const ProgressBar = (total) => {
    return div({class: "bar"}, span({class: "bar-fg", style: `width: ${100}%`}, "VALUE + ", total))
}
const AddTaskToLayerButton = (targetLayer, parentObject) => {
    let obj = {text: "", task: false}
    return button(
        {onclick: () => { 
            parentObject["task"] = obj; 
            van.add(targetLayer, TaskElem(obj));}}, 
        "+Add Task")

}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, TopLayer(dummy), prefs)
