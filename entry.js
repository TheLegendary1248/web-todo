import van from "vanjs-core"
import { reactive } from "vanjs-ext"
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
const { div, p, input, span, button,textarea} = van.tags
const title = van.state("TITLE")
/** Common elements of the TopLayer and TaskElement */
const TaskContainer = (tasks) => {
    let nestedtasks = div(typeof tasks == "object" ? tasks.map(x => TaskElem(x)) : []);
    return div(
        nestedtasks,
        AddTaskToLayerButton(nestedtasks),
        ProgressBar
    )
}
const TaskElem = (state) => {
    const text = van.state(state.text)
    const weight = van.state(1)
    const deleted = van.state(false)
    return () => deleted.val ? null : div({class: "task"},
        
        textarea({value: text, oninput: e => {let elem = e.target; text.val = elem.value; elem.style.height = ""; elem.style.height = elem.scrollHeight + 3 + "px"}}),
        input({type:"checkbox"}),
        input({type:"number",placeholder:"weight"}),
        button({onclick: () => {deleted.val = true; console.log("heyo")}}, "DELETE"),
        TaskContainer(state.task)
        )
}
/** The Bar that shows the completeness of the current parent task */
const ProgressBar = () => {
    return div({class: "bar"}, span({class: "bar-fg", style: `width: ${100}%`}, "VALUE"))
}
const AddTaskToLayerButton = (targetLayer) => {
    return button({onclick: () => van.add(targetLayer, TaskElem({text: "", task: false}))}, "+Add Task")

}
/** @param {Array} taskArr */
const TopLayer = (state) => {
    let title = van.state(state.title)
    let tasks = van.state(state.task)
    let dom = 
    div({id:"toplayer"},
        input({oninput: (e) => {title.val = e.target.value}, 
        value: title, id:"title"}),
        TaskContainer(tasks.val)
    )
    return dom
}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, TopLayer(dummy), prefs)
