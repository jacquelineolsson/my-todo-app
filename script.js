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


   infoText.innerText = "DON'T YOU DARE";
   infoText.classList.add("shake");
   setTimeout (() => {
    infoText.classList.remove("shake")
   }, 4000);
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
trash.innerHTML = '🪦';
trash.classList.add("trashcan");
todoItem.appendChild(trash);


trash.addEventListener(
    "click",
    function(){
        const sound = new Audio('ghost.mp3');
        sound.play();

        todoItem.classList.add("fade-out");

        setTimeout(function() {
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
        }, 1500);
    });
input.value = "";
}

function spawnBat() {
  
    const bat = document.createElement("span");
    bat.className = "bat";
    bat.innerText = "🦇"; 

    const randomTop = Math.random() * 70 + 10;
    bat.style.top = randomTop + "vh";

    const randomDuration = Math.random() * 4 + 4;
    bat.style.animation = `flyAcross ${randomDuration}s linear`;

    document.body.appendChild(bat);

    setTimeout(() => {
       
        bat.style.opacity = '0';
        setTimeout(() => {
            bat.remove();
        }, 500);
    }, randomDuration * 1000); 
}

setInterval(spawnBat, 12000);