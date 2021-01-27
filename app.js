
// Show existing items

function existingItems(){
    var items = ['First item', 'Second item'];

    items.forEach(function (item){
        addTodo(item)
    })
}

existingItems();


// Selectors

document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);
document.getElementById('filterInput').addEventListener('keyup', handleFilterNames);
document.getElementById('sort').addEventListener('click', handleSort);

// Event handlers

function handleSubmitForm(event) {
    event.preventDefault();
    var input = document.querySelector('input');
    if(input.value != ''){
        addTodo(input.value);
    }

    input.value = '';

}

function handleClickDeleteOrCheck(event) {
    if(event.target.name == 'checkButton') {
        editTodo(event);
    }

    if(event.target.name == 'deleteButton') {
        deleteTodo(event);
    }
}

function handleClearAll(event) {
    document.querySelector('ul').innerHTML = '';
}

function handleFilterNames(event) {
    var filterValue = document.getElementById('filterInput').value.toUpperCase();

    // Get list items

    var li = document.querySelectorAll('li');

    // Loop through list items

    for(var i=0; i<li.length; i++){
        // If matched
        if(li[i].innerHTML.toUpperCase().indexOf(filterValue) > -1){
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }

}

function handleSort(event) {

    // Get the items
    var ul = document.querySelector('ul');
    var items = document.querySelectorAll('li');
    var itemsArr = [];

    ul.innerHTML="";

    // get rid of the whitespace text nodes
    for (var i=0; i<items.length; i++) {
        if (items[i].nodeType == 1) {
            itemsArr.push(items[i]);
        }
    }

    // Sort items ascending or descending
    if(ul.classList.contains("sorted")) {
        itemsArr.sort(function(a, b) {
            return a.innerHTML == b.innerHTML ? 0 : (a.innerHTML>b.innerHTML ? -1 : 1)
        })
    }else {
        itemsArr.sort(function(a, b) {
            return a.innerHTML == b.innerHTML ? 0 : (a.innerHTML>b.innerHTML ? 1 : -1)
        })
    }
    

    // Add items to the ul
    for(var i=0; i<itemsArr.length; i++) {
        ul.appendChild(itemsArr[i])
    }

    // Add class to put a check
    ul.classList.toggle("sorted");
}   

// Helpers

function addTodo(todo) {
    var ul = document.querySelector('ul');
    var li = document.createElement('li');
    

    li.innerHTML = `
        <input type='text' class='todo-item' value='${todo}' disabled=true />
        <button name='checkButton'>Edit</button>
        <button name='deleteButton'>Delete</button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li)
}

function editTodo(event) {
    // Get the input field
    var item = event.target.parentNode;
    var editInput = item.children[0];
    editInput.disabled=false;
    editInput.focus();
    editInput.select();
    editInput.classList.add("editInput");

    // Disable editing for input field
    editInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            editInput.disabled=true;
            editInput.classList.remove("editInput");
        }
    })
}

function deleteTodo(event ) {
    var item = event.target.parentNode;
    item.remove();
}