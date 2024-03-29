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
const TaskContainer = (parentObject, total, complete) => {
    let tasks = parentObject.task
    let nestedtasks = div({class: "nested"}, typeof tasks == "object" ? tasks.map(x => TaskElem(x,total, complete)) : []);
    return div({class: "task-container"},
        nestedtasks,
        AddTaskToLayerButton(nestedtasks, parentObject, total, complete),
        ProgressBar(total, complete)
    )
}
const AutoSave = () => {
    localStorage.setItem("test", JSON.stringify(dummy))
}
const TaskDefaults = { weight: 1, text: "", task: false}
const TaskNestedDefaults = { text: "", task: []}
const TaskElem = (task, total, complete) => {
    const setNested = () => {
        //This funny stuff is here because we want 'task' itself to take precedence
        //The spread op can't be used alone because we need the ref to task intact
        Object.assign(task, {...TaskDefaults, ...task})
        delete task.weight
    }
    const setLeaf = () => {
        Object.assign(task, {...TaskNestedDefaults, ...task}) 
    }
    if(typeof task.task == "boolean" | task.task == undefined) 
        setLeaf()
    else 
        setNested()
    const text = van.state(task.text)
    const weight = van.state(task.weight ?? 0)
    const deleted = van.state(false)
    if(task.weight != undefined){
        total.val += task.weight
    }
    let init = true
    van.derive(() => {
        weight.val
        if(init) return
        console.log("weight was changed", weight.val, weight.oldVal) //NESTED DO NOT HAVE WEIGHT WHICH WHY NO WORK
        total.val += weight.val - weight.oldVal
        //Logic for recalc here
    })
    van.derive(() => {
        deleted.val
        if(init) return
        console.log("deleted was changed", deleted.val)
        if(!deleted.val){
            //This task was deleted
        }
    })
    let leafTaskCtrls = div({class: "leaf-task-ctrls"},
        input({type:"checkbox"}),
        input({type:"number",placeholder:"weight", min: 0, value: weight, oninput: e => weight.val = e.target.value}),
        
    )
    init = false
    return () => deleted.val ? null : div({class: "task"},
        textarea(
            {placeholder:"Theres no text here", 
            value: text, 
            onchange: e => {let elem = e.target; text.val = elem.value; },
            oninput: e => {let elem = e.target; elem.style.height = ""; elem.style.height = elem.scrollHeight + "px"}
        }),
        leafTaskCtrls,
        button({onclick: () => {deleted.val = true; console.log("heyo, this shit was deleted")}}, "DELETE"),
        TaskContainer(task,total,complete)
        )
}
/** @param {Array} taskArr */
const TopLayer = (setObject) => {
    let total = van.state(0)
    let complete = van.state(0)
    let title = van.state(setObject.title)
    let dom = div({id:"toplayer"},
        input({oninput: (e) => {title.val = e.target.value}, 
        value: title, id:"title"}),
        TaskContainer(setObject, total, complete)
    )
    console.log(setObject)
    return dom
}
/** The Bar that shows the completeness of the current parent task */
const ProgressBar = (total) => {
    return div({class: "bar"}, span({class: "bar-fg", style: `width: ${100}%`}, "VALUE + ", total))
}
const AddTaskToLayerButton = (targetLayer, parentObject, total, complete) => {
    let obj = {text: "", task: false}
    return button(
        {onclick: () => { 
            parentObject["task"] = obj; 
            van.add(targetLayer, TaskElem(obj, total, complete));}}, 
        "+Add Task")
}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, TopLayer(dummy), prefs)
