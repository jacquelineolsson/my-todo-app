const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("ul");
const input = document.querySelector("#todo-input");
const infoText = document.querySelector("#infoText");
const countTodos = document.querySelector("#countTodos");


let completedCount =0;
let todoID = 0;
const todoArray = [];


// function to change the completed status of a todo item in the array
function changeStatus(id) {
    const todoItem = todoArray.find(x => x.id === id);
    if (todoItem) todoItem.completed = !todoItem.completed;
}


addBtn.addEventListener(
    "click",
    addTodoItem
);
// listen for Enter key press to add todo item
input.addEventListener("keypress",
    function(event) {
        if(event.key === "Enter") {
            addTodoItem();
       }
    });




// function to add a todo item to the list
function addTodoItem(){


const text = input.value;
infoText.innerText = "";


// check if input is empty
if(text.length === 0){


   infoText.innerText = "Please enter a task to add";
   return;
}


//  create todo object and add it to the array
const todoObject = {};
todoObject.id = todoID;
todoObject.name = text;
todoObject.completed = false;


todoArray.push(todoObject);
console.log(todoArray);
todoID++;


// create a new list item and add it to the todo list
const todoItem = document.createElement("li");
todoList.appendChild(todoItem);


const itemLabel = document.createElement("span");
itemLabel.innerText = text;
todoItem.appendChild(itemLabel);


// mark item as completed when clicked
itemLabel.addEventListener(
"click",
function(){
    if(todoItem.getAttribute("class") == "completed"  ){ //remove completed class
       completedCount--;
       
         todoItem.setAttribute("class", "");


    }
    else
    {
        todoItem.setAttribute("class", "completed");  // add completed class
        completedCount++;
       
    }
    countTodos.innerText = `${completedCount} completed`;
    changeStatus(todoObject.id); // update the completed status in the array
    console.log(todoArray);
}




);
// create a trashcan to the list
const trash = document.createElement("span");
trash.innerHTML = "&#x1F5D1";
trash.classList.add("trashcan");
todoItem.appendChild(trash);


trash.addEventListener(
    "click",
    function(){
        if (todoObject.completed) {   //If todo was done when deleted, change completed
            completedCount--;
            countTodos.innerText = `${completedCount} completed`;
        }
       
        todoItem.remove();
// find the index of the todo item to remove from the array
    const index = todoArray.findIndex(item => item.id === todoObject.id);
        if (index !== -1) {
            todoArray.splice(index, 1); }
            console.log(todoArray);
   
 });




input.value = "";
}
