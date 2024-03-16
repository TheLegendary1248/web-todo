import van from "vanjs-core"
import { reactive } from "vanjs-ext"
import "./style.css"
const { div, p, input, span, button,textarea} = van.tags
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
const title = van.state("TITLE")
const task = (state) => {
    const text = van.state(state.text)
    let MYDIVS = typeof state.task == "object" ? state.task.map(x => task(x)) : null;
    
    return div({class: "task"},
        textarea({value: text, oninput: e => {let elem = e.target; text.val = elem.value; elem.style.height = ""; elem.style.height = elem.scrollHeight + 3 + "px"}}),
        MYDIVS,
        progress)
}
const progress = () => {
    return div({class: "bar"}, span("VALUE"))
}
/**
 * 
 * @param {Array} taskArr 
 */
const forEachTask = (taskArr) => {
    taskArr.map(x => task(x))
}
const toplayer = (JSONstate) => {
    const state = reactive(JSONstate)
    let title = van.state(state.title)
    globalThis["test"] = state
    console.log(state.task)
    return div({id:"toplayers"},input({oninput: (e) => {title.val = e.target.value}, value: title, id:"title"}),div(title),
    state.task.map(x => task(x)))
}
const set = () => {

}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, toplayer(dummy), prefs)
