// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function delete_todo(id) {
    $.ajax({
        url: "/todo/delete?id=" + id,
        success: (data) => {
            render(data["todoItems"])
        },
        dataType: "json"
    })
}

function toggle_todo(id) {
    $.ajax({
        url: "/todo/toggle?id=" + id,
        success: (data) => {
            render(data["todoItems"])
        },
        dataType: "json"
    })
}

function create_todo(input, refocus = false) {
    text = encodeURIComponent(input.value)
    $.ajax({
        url: "/todo/create?text=" + text,
        dataType: "json",
        success: (data) => {
            render(data["todoItems"], refocus)
        }
    })
}

function render_text_input() {
    let parent = document.createElement("div")
    parent.className += " d-block form-inline my-5"

    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.className += " form-control d-inline mr-1"
    input.id = "todo-text-input"

    let submit_button = document.createElement("button")
    submit_button.className += " d-inline btn btn-primary"
    submit_button.textContent = "Add Task"

    submit_button.onclick = () => create_todo(input)
    submit_button.onkeydown = () => create_todo(input)
    input.onkeydown = (event) => {
        if (event.key === "Enter") {
            create_todo(input, true) // refocus = true
        }
    }

    parent.appendChild(input)
    parent.appendChild(submit_button)
    return parent
}

function render_checkbox(id) {
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.className += " form-control mx-2"

    checkbox.onclick = () => toggle_todo(id)
    checkbox.onkeydown = () => toggle_todo(id)

    return checkbox
}

function render_label(text) {
    let label = document.createElement("label")
    label.textContent = text
    label.style = "min-width: 24rem;"
    label.className += " mx-2 text-left"
    return label
}

function render_delete_button(id) {
    let delete_button = document.createElement("button")
    delete_button.textContent = "Remove"
    delete_button.className += " btn btn-secondary btn-sm mx-2"

    delete_button.onclick = () => delete_todo(id)
    delete_button.onkeydown = () => delete_todo(id)

    return delete_button
}

function render_todo_item(todo) {
    let row = document.createElement("div")
    row.className += " form-inline todo-item my-2 mx-auto d-block"
    row.id = "todo-item-" + todo["Index"].toString()

    let checkbox = render_checkbox(todo["Index"])
    let label = render_label(todo["Text"])
    let delete_button = render_delete_button(todo["Index"])

    checkbox.className += " form-control"
    label.className += " form-control"
    delete_button.className += " form-control"

    if (todo["Done"]) {
        checkbox.setAttribute("checked", "true")
        label.setAttribute("style", label.getAttribute("style") + " text-decoration: line-through;")
    }

    if (todo["Deleted"]) {
        row.className = row.className.split(" ").filter((x) => x !== "d-block").join(" ")
        row.setAttribute("hidden", "true")
    }

    row.appendChild(checkbox)
    row.appendChild(label)
    row.appendChild(delete_button)

    return row
}

function focus_text_input() {
    document.getElementById('todo-text-input').focus()
}

function render(todoItems, refocus = false) {
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i]["Index"] = i
    }
    let rows = todoItems.map(render_todo_item)
    let list = document.createElement("div")
    list.className += " d-block mx-auto"
    $(list).append(rows)

    let root = document.getElementById("root")
    let text_input = render_text_input()

    $(root).empty()
    root.appendChild(text_input)
    root.appendChild(list)

    if (refocus) {
        document.getElementById('todo-text-input').focus()
    }
}

render([])