import van from "vanjs-core"
import "./style.css"
const { div, p, span, button,textarea } = van.tags
const prefs = () => {

}
const task = () => {
    return div(
        p({contentEditable:true}, "TASK"),
        div("NEST"))
} 
const toplayer = () => {
    
    
}
const set = () => {

}
van.add(document.body, toplayer)