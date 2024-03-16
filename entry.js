import van from "vanjs-core"
import "./style.css"
const { div, p, span, button,textarea } = van.tags
const task = () => {
    return div({class: "task"},
        p({contentEditable:true}, "TASK"),
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