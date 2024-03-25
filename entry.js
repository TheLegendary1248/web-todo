import van from "vanjs-core"
import "./style.css"
let dummy = 
{
    title: "Hello Title",
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
const TaskContainer = (parentObject) => {
    let tasks = parentObject.tasks
    let nestedtasks = div({class: "nested"}, typeof parentObject == "object" ? parentObject.map(x => TaskElem(x)) : []);
    return div({class: "task-container"},
        nestedtasks,
        AddTaskToLayerButton(nestedtasks, parentObject),
        ProgressBar()
    )
}
const AutoSave = () => {
    localStorage.setItem("test", JSON.stringify(dummy))
}
const TaskElem = (state) => {
    const text = van.state(state.text)
    const weight = van.state(state.weight)
    const deleted = van.state(false)
    const hasNested = van.state(!(typeof state.task === "boolean"))
    let leafTaskCtrls = div({class: "leaf-task-ctrls"},
        input({type:"checkbox"}),
        input({type:"number",placeholder:"weight", min: 0, value: weight, oninput: e => weight.val = e.target.value}),
        button({onclick: () => {deleted.val = true; console.log("heyo")}}, "DELETE")
    )
    return () => deleted.val ? null : div({class: "task"},
        textarea(
            {placeholder:"Theres no text here", 
            value: text, 
            onchange: e => {let elem = e.target; text.val = elem.value; },
            oninput: e => {let elem = e.target; elem.style.height = ""; elem.style.height = elem.scrollHeight + "px"}
        }),
        leafTaskCtrls,
        TaskContainer(state.task)
        )
}
/** @param {Array} taskArr */
const TopLayer = (setObject) => {
    let title = van.state(setObject.title)
    let dom = div({id:"toplayer"},
        input({oninput: (e) => {title.val = e.target.value}, 
        value: title, id:"title"}),
        TaskContainer(setObject.task)
    )
    return dom
}
/** The Bar that shows the completeness of the current parent task */
const ProgressBar = () => {
    return div({class: "bar"}, span({class: "bar-fg", style: `width: ${100}%`}, "VALUE"))
}
const AddTaskToLayerButton = (targetLayer, parentObject) => {
    let obj = {text: "", task: false}
    return button(
        {onclick: () => { 
            //parentObject["task"] = obj; 
            van.add(targetLayer, TaskElem(obj));}}, 
        "+Add Task")

}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, TopLayer(dummy), prefs)
