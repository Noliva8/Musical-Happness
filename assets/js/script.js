$(document).ready(function () {
    // Retrieve tasks and nextId from localStorage
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let nextId = JSON.parse(localStorage.getItem("nextId")) || 1000; // Default ID start value

    // Function to generate a unique task ID
    function generateTaskId() {
        nextId += 1;
        localStorage.setItem('nextId', JSON.stringify(nextId));
        return nextId;
    }

    // Function to determine the color based on the due date
    function getColorByDate(dueDate) {
        const today = new Date();
        const deadline = new Date(dueDate);
        const diffDays = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return 'red'; // Overdue
        } else if (diffDays <= 7) {
            return 'yellow'; // Nearing deadline
        } else {
            return 'white'; // On time
        }
    }

    // Function to create a task card
    function createTaskCard(task) {
        if (!task || !task.title || !task.date || !task.description) {
            console.error('Invalid task object');
            return;
        }

        const cardContainerEl = $('<div>')
            .addClass('cardContainer ui-widget-content')
            .attr('data-task-id', task.id)
            .css('background-color', getColorByDate(task.date))
            .text(task.title);

        const cardDescriptionEl = $('<p>').addClass('description-p').text(task.description);
        const deleteButton = $('<button>').addClass('btn btn-danger btn-sm delete-btn').text('Delete');

        deleteButton.on('click', function () {
            handleDeleteTask(task.id);
        });

        cardContainerEl.append(cardDescriptionEl);
        cardContainerEl.append(deleteButton);

        // Append the card to the appropriate lane based on its status
        $(`#${task.status}-cards`).append(cardContainerEl);

        // Make the card draggable
        cardContainerEl.draggable({
            revert: 'invalid',
            helper: 'clone',
            start: function (event, ui) {
                ui.helper.data('task-id', task.id);
                ui.helper.css('background-color', 'lightgray'); // Temporary color change during drag
            },
            stop: function (event, ui) {
                const taskId = ui.helper.data('task-id');
                const task = getTaskById(taskId);
                ui.helper.css('background-color', getColorByDate(task.date));
            }
        });
    }

    // Function to get a task by its ID
    function getTaskById(id) {
        return taskList.find(task => task.id === id);
    }

    // Function to render the task list
    function renderTaskList() {
        $('.cardContainer').remove(); // Clear existing cards

        taskList.forEach(task => {
            createTaskCard(task);
        });
    }

    // Function to handle adding a new task
    function handleAddTask(event) {
        event.preventDefault();

        let titleCard = $('#task-title').val();
        let dateCard = $('#due-date').val();
        let descriptionCard = $('#task-description').val();

        let task = {
            id: generateTaskId(),
            title: titleCard,
            date: dateCard,
            description: descriptionCard,
            status: 'todo' // Default status
        };

        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));

        createTaskCard(task);
        $('#task-title').val('');
        $('#due-date').val('');
        $('#task-description').val('');
        $('#formModal').modal('hide');
    }

    // Function to handle deleting a task
    function handleDeleteTask(taskId) {
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        renderTaskList();
    }

    // Function to handle dropping a task into a new status lane
    function handleDrop(event, ui) {
        const taskId = ui.helper.data('task-id');
        const newStatus = $(event.target).closest('.lane').attr('id').split('-')[0]; // Get the new status from the target's ID

        // Update the task's status
        taskList = taskList.map(task => {
            if (task.id === taskId) {
                task.status = newStatus;
            }
            return task;
        });

        localStorage.setItem('taskList', JSON.stringify(taskList));
        renderTaskList();
    }

    // Initialize droppable areas for lanes
    $('.lane').droppable({
        accept: '.cardContainer',
        drop: handleDrop,
        over: function (event, ui) {
            $(this).addClass('ui-state-highlight');
        },
        out: function (event, ui) {
            $(this).removeClass('ui-state-highlight');
        }
    });

    // Initialize date picker
    $('#due-date').datepicker();

    // Event listeners
    $('#form').on('submit', handleAddTask);

    // Initial call to render the task list from local storage
    renderTaskList();
});
