import van from "vanjs-core"
import "./style.css"
const { div, p, span, button,textarea, br} = van.tags
let outsideUpdate = false
const task = () => {
    const text = van.state("")
    return div({class: "task"},
        textarea({value: text, oninput: e => {let elem = e.target; text.val = elem.value; elem.style.height = ""; elem.style.height = elem.scrollHeight + 3 + "px"}}),
        div("NEST"),
        progress)
}
const progress = () => {
    return div({class: "bar"}, span("VALUE"))
}
const toplayer = () => {

    return task()
}
const set = () => {

}
const fontselect = () => {
    return div("FONT SELECT")
}
document.querySelectorAll(".f-sel").forEach(x => van.add(x, fontselect))
van.add(document.body, toplayer, prefs)