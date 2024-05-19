// Retrieve tasks and nextId from localStorage
const cardContainerEl = $('<div>');
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
let x = 9999;
function generateTaskId() {
  const taskId = Math.floor(Math.random() * 9999);
return taskId;

 localStorage.setItem('taskId', JSON.stringify(taskId));
}



// Todo: create a function to create a task card
 let titleCard = $('#task-title');
  let dateCard = $('#due-date');
  let desscriptionCard = $('#task-description');

 let task = {
    title : titleCard.val(),
    date : dateCard.val(),
    description : desscriptionCard.val(),
  }
function createTaskCard(task) {
  
  cardContainerEl.addClass('cardContainer');
  const cardHeaderEl = $("<h5>");
  cardContainerEl.append(cardHeaderEl);
  const cardDateEl = $('<p>');
  cardDateEl.addClass('date-p');
  cardContainerEl.append(cardDateEl);
  const cardDescriptionEl = $('<p>');
  cardDescriptionEl.addClass('description-p');
  cardContainerEl.append(cardDescriptionEl);


cardHeaderEl.text(task.title);
cardDateEl.text(task.date);
cardDescriptionEl.text(task.description);

 


}



// Todo: create a function to render the task list and make cards draggable

const taskArray = [];
function renderTaskList() {
  const dragableEl = $("<div>");
  dragableEl.attr('id', 'draggable');
  dragableEl.addClass('ui-widget-content');
  containerEl = $('.container');
  
 dragableEl.append(cardContainerEl);
  containerEl.append(dragableEl);

for(let i = 0; i < taskArray.length; i++)


taskArray.push(task);
localStorage.setItem('task', JSON.stringify(taskArray));

cardHeaderEl.text("");
cardDateEl.text("");
cardDescriptionEl.text("");

}








// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});