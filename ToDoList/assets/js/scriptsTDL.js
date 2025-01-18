// scriptsTDL.js

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const taskCounter = document.getElementById("task-counter");
    const taskListContainer = document.querySelector(".task-list-container"); // Contenedor de tareas

    // Cargar tareas almacenadas al inicio
    loadTasks();
    toggleTaskListVisibility(); // Mostrar/ocultar el contenedor al inicio

    // Agregar una nueva tarea
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            Swal.fire({
                icon: "error",
                title: "Por favor, introduce una tarea",
            });
            return;
        }

        const taskItem = createTaskElement(taskText, false);
        taskList.prepend(taskItem); // Añadir al inicio de la lista

        saveTasks(); // Guardar en el almacenamiento
        updateTaskCounter(); // Actualizar contador
        toggleTaskListVisibility(); // Mostrar el contenedor si estaba oculto
        taskInput.value = ""; // Limpiar el campo
    });

    // Crear un elemento de tarea
    function createTaskElement(text, completed) {
        const taskItem = document.createElement("li");
        taskItem.textContent = text;

        if (completed) {
            taskItem.classList.add("completed");
        }

        // Botón de completar
        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        const completeIcon = document.createElement("img");
        completeIcon.src = completed ? "assets/images/uncheck-icon.svg" : "assets/images/check-icon.svg";
        completeIcon.alt = completed ? "Desmarcar tarea" : "Completar tarea";
        completeBtn.appendChild(completeIcon);

        completeBtn.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            completeIcon.src = taskItem.classList.contains("completed")
                ? "assets/images/uncheck-icon.svg"
                : "assets/images/check-icon.svg";
            completeIcon.alt = taskItem.classList.contains("completed")
                ? "Desmarcar tarea"
                : "Completar tarea";

            moveCompletedTasks(); // Mover tarea completada al final
            saveTasks(); // Guardar en almacenamiento
            updateTaskCounter(); // Actualizar contador
        });

        // Botón de eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "assets/images/delete-icon.svg";
        deleteIcon.alt = "Eliminar tarea";
        deleteBtn.appendChild(deleteIcon);

        deleteBtn.addEventListener("click", () => {
            Swal.fire({
                title: "¿Deseas eliminar esta tarea?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    taskItem.remove();
                    saveTasks(); // Guardar en almacenamiento
                    updateTaskCounter(); // Actualizar contador
                    toggleTaskListVisibility(); // Ocultar el contenedor si no hay tareas

                    Swal.fire("¡Eliminado!", "La tarea ha sido eliminada.", "success");
                }
            });
        });

        // Contenedor de botones
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        // Añadir botones al elemento de tarea
        taskItem.appendChild(buttonContainer);

        return taskItem;
    }

    // Guardar tareas en el almacenamiento
    function saveTasks() {
        const tasks = [...taskList.querySelectorAll("li")].map((task) => ({
            text: task.firstChild.textContent.trim(),
            completed: task.classList.contains("completed"),
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Cargar tareas desde el almacenamiento
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
        updateTaskCounter(); // Actualizar contador al cargar
    }

    // Mover tareas completadas al final
    function moveCompletedTasks() {
        const tasks = [...taskList.children];
        tasks.sort((a, b) => a.classList.contains("completed") - b.classList.contains("completed"));
        tasks.forEach((task) => taskList.appendChild(task)); // Reordenar lista
    }

    // Actualizar el contador de tareas
    function updateTaskCounter() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll(".completed").length;
        const pendingTasks = totalTasks - completedTasks;

        taskCounter.textContent = `Tareas: ${totalTasks} | Pendientes: ${pendingTasks} | Completadas: ${completedTasks}`;
    }

    // Mostrar u ocultar el contenedor de tareas
    function toggleTaskListVisibility() {
        taskListContainer.style.display = taskList.children.length === 0 ? "none" : "block";
    }
});
