{
    let tasks = [];
    let hideDoneTask = false;


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const setAllTaskDone = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, taskIndex) => {
            removeButtons.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };
        
    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const bindToggleTasksDone = () => {
        const toggleHideDoneTasksButtons = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButtons) {
            toggleHideDoneTasksButtons.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        };
    };

    const finishAllTasksDone = () => {
        const toggleAllTasksButton = document.querySelector(".js-finishAllTasks");

        if (toggleAllTasksButton) {
            toggleAllTasksButton.addEventListener("click", () => {
                setAllTaskDone();
            });
        }
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
          <li class= "list__item js-tasks ${task.done && hideDoneTask ? " list__item--hidden" : ""}"">
          <button class="list__button js-done" >
          ${task.done ? "✔" : ""}
          </button>
          <span class= "list__taskContent ${task.done ? "list__task--done" : ""}">${task.content}</span>
          <button class=" list__buttonRemove js-remove">🗑</button>
          </li>
          `;

        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonsHTML = "";

        if (tasks.length > 0) {
            buttonsHTML += `
            <button class="section__button js-toggleHideDoneTasks">
                ${hideDoneTask === true ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__button js-finishAllTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        };

        document.querySelector(".js-buttons").innerHTML = buttonsHTML;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        document.querySelector(".js-newTask").value = "";
        newTaskElement.focus();
    };

    const render = () => {
        renderTask();
        renderButtons();

        bindEvents();
        bindToggleTasksDone();
        finishAllTasksDone();
        bindToggleDoneEvents();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};