## Checklist

- [ ] Must be able create a Task with text content
  - [ ] be able to delete or edit the Task  
  - [ ] have numerical weight that applies to the Progress Bar calculation
  - [ ] be able to nest tasks within the Task(like a checklist), which have the same rules above applied 
  to it
  - [ ] be able to see a Progress Bar for nested Tasks, which has the same rules as the top level Progress Bar applied to it

- [ ] Be able to see a Progress bar for Tasks
  - [ ] Have a graphic display (loading bar style)  
  - [ ] SWITCHABLE AND TOGGLEABLE percentage, and fractional ($n/$d) display on top of the Progress Bar

- [ ] Must be keyboard friendly  
  - [ ] At least be able to use one set of [\*opposing keys](#footer) to move between Tasks within the same Task or Set
  - [ ] At least be able to use the other set of [\*opposing keys](#footer) to move into or outside of a Task
  - All important elements should be `Tab`-able
    - [ ] Tasks
    - [ ] Any Task modification(create/edit/delete) elements
    - [ ] Settings Context
    - [ ] Set Context
  - [ ] A shortcut to switch/toggle Progress Bar number display
  - [ ] A shortcut to move to the top-most Task
  - [ ] A shortcut to create or delete the selected Task
  - [x] An always visible shortcut legend
  - [ ] All functionality should be available without use of a mouse, touch, or otherwise pointing device

- [ ] A Settings / User Preferences Context
  - [ ] Must be able to change a universal padding / margin style
  - [ ] Edit / Change color theme (this includes text coloring, task background colors, button / selectable element inactive colors)
  - [ ] Change font (requires at least task text font and all other fonts to be separate)
  - [ ] Modify press-and-hold deletion action time or Do Not Show Again warning dialogue
  - [ ] Switch and toggle Progress Bar 
  - [ ] Restore defaults button
  - [ ] Settings must be persistent between sessions

- [ ] A Set Context
  - [ ] Save & Load & Delete & Create different Sets of Tasks
    - [ ] Use localstorage or indexdb
  - [ ] Name / Label each Set

- [ ] Deletion of Sets and Tasks with Nested Tasks must have a warning dialogue or require a press-and-hold action of at least 2 seconds by default

- [ ] Must be hosted on GitHub Pages  
  - You can push as many commits as you want. Ideally, have a `RELEASE` branch that has the final and all previous useable versions. Please [\*\*mark the final version in any way](#footer), if you want to continue working on it for the heck of it
- [/] Must refer to this GitHub Gist in the README.md 