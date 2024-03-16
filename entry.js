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
    const complete = van.state(!!state.task)
    let MYDIVS = typeof state.task == "object" ? state.task.map(x => task(x)) : null;
    
    return div({class: "task"},
        
        textarea({value: text, oninput: e => {let elem = e.target; text.val = elem.value; elem.style.height = ""; elem.style.height = elem.scrollHeight + 3 + "px"}}),
        input({type:"checkbox"}),
        input({type:"number",placeholder:"weight"}),
        button("DELETE"),
        div(MYDIVS,
        progress)
        )
}
const progress = () => {
    return div({class: "bar"}, span("VALUE"))
}
/**
 * 
 * @param {Array} taskArr 
 */
const toplayer = (state) => {
    let title = van.state(state.title)
    let tasks = van.state(state.task)
    globalThis["tasks"] = tasks
    console.log(tasks)
    return div({id:"toplayers"},
    input({oninput: (e) => {title.val = e.target.value}, 
    value: title, id:"title"}),
    button(
        {onclick: () => {tasks.val = tasks.val.concat({text:"LOREM< IPSUM", task:false})}},
        "CREATE"),
    tasks.val.map(x => task(x)))
}
const set = () => {

}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, toplayer(dummy), prefs)
