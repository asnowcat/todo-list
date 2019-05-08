// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function delete_todo(id) {
    $.ajax({
        url: "/todo/delete?id=" + id,
        success: (data) => {
            render(data["todoItems"]);
            console.log(data["todoItems"])
        },
        dataType: "json"
    })
}

function toggle_todo(id) {
    $.ajax({
        url: "/todo/toggle?id=" + id,
        success: (data) => {
            render(data["todoItems"]);
            console.log(data["todoItems"])
        },
        dataType: "json"
    })
}

function create_todo(input) {
    text = encodeURIComponent(input.value)
    $.ajax({
        url: "/todo/create?text=" + text,
        success: (data) => {
            render(data["todoItems"]);
            console.log(data["todoItems"])
        },
        dataType: "json"
    })
}

function render_text_input() {
    let parent = document.createElement("div")
    parent.className += " container"
    let row = document.createElement("div")
 
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.className += " d-inline"
    input.id = "todo-text-input"

    let submit_button = document.createElement("button")
    submit_button.className += " d-inline"
    submit_button.textContent = "Submit"

    submit_button.onclick = () => create_todo(input)
    submit_button.onkeydown = () => create_todo(input)
    input.onkeydown = (event) => {
        if (event.key === "Enter") {
            create_todo(input)
        }
    }

    row.appendChild(input)
    row.appendChild(submit_button)
    parent.appendChild(row)

    return parent
}

function render_checkbox(id) {
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")

    checkbox.onclick = () => toggle_todo(id)
    checkbox.onkeydown = () => toggle_todo(id)

    return checkbox
}

function render_label(text) {
    let label = document.createElement("p")
    label.textContent = text
    return label
}

function render_delete_button(id) {
    let delete_button = document.createElement("button")
    delete_button.textContent = "Delete"

    delete_button.onclick = () => delete_todo(id)
    delete_button.onkeydown = () => delete_todo(id)

    return delete_button
}

function render_todo_item(todo) {
    let row = document.createElement("div")
    row.className += " row"
    row.className += " todo-item"
    row.id = "todo-item-" + todo["Index"].toString()

    let checkbox_cell = document.createElement("div")
    let label_cell = document.createElement("div")
    let delete_button_cell = document.createElement("div")

    checkbox_cell.className += " col"
    label_cell.className += " col"
    delete_button_cell.className += " col"

    let checkbox = render_checkbox(todo["Index"])
    let label = render_label(todo["Text"])
    let delete_button = render_delete_button(todo["Index"])

    if (todo["Done"]) {
        checkbox.setAttribute("checked", "true")
        label.setAttribute("style", "text-decoration: line-through;")
    }

    if (todo["Deleted"]) {
        row.setAttribute("hidden", "true")
    }

    checkbox_cell.appendChild(checkbox)
    label_cell.appendChild(label)
    delete_button_cell.appendChild(delete_button)

    row.appendChild(checkbox_cell)
    row.appendChild(label_cell)
    row.appendChild(delete_button_cell)

    return row
}

function render(todoItems) {
    for (let i = 0; i < todoItems.length; i++) {
        todoItems[i]["Index"] = i
    }
    let rows = todoItems.map(render_todo_item)
    let list = document.createElement("div")
    list.className += " container pb-3"
    $(list).append(rows)

    let root = document.getElementById("root")
    let text_input = render_text_input()

    $(root).empty()
    root.appendChild(text_input)
    root.appendChild(list)
}

render([])