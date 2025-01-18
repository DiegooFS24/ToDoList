<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    include 'includes/headerTDL.php';
    ?>
    <title>ToDo List</title>
</head>
<body style="background: url('assets/images/background.webp') no-repeat center center fixed; background-size: cover;">
    <div class="todo-app">
        <h1>Lista de Tareas</h1>

        <!-- Contenedor para agregar nuevas tareas -->
        <div class="task-input-container">
            <div class="input-section">
                <input type="text" id="task-input" placeholder="Introduce tu tarea...">
                <button id="add-task-btn" class="btn">
                    <!-- Botón con icono para añadir tareas -->
                    <img src="assets/images/add-icon.svg" alt="Añadir tarea">
                </button>
            </div>
        </div>

        <!-- Contenedor para la lista de tareas -->
        <div class="task-list-container">
            <ul id="task-list"></ul>
        </div>

        <!-- Contador de tareas -->
        <p id="task-counter">Total: 0, Pendientes: 0, Completadas: 0</p>
    </div>
    <?php
    // Incluir el archivo del pie de página
    include 'includes/footerTDL.php';
    ?>
</body>
</html>
