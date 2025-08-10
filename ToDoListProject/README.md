# ToDoListProject

Overview:
This project is a modern To-Do List application built with Angular, designed to help users manage tasks efficiently. The app allows users to add, mark as complete, edit, and delete tasks, with data persistence using localStorage. It features a modular architecture with three components, intuitive user interactions, and a professional, visually appealing design.

Features:
- Add Tasks: Input new tasks with validation to prevent empty submissions.
- Task Management: Mark tasks as complete or delete them with dedicated controls.
- Data Persistence: Tasks are saved in localStorage to persist across page refreshes.
- Edit Tasks (Bonus): Edit existing tasks for enhanced flexibility.
- Responsive Design: Clean, professional UI with a modern color theme and hover effects.
- Animations: Subtle animations for task interactions to improve user experience.

Project Structure:
The application is built with a modular Angular architecture, consisting of three components:

TaskManagerComponent (Parent):
- Manages the task list state and logic.
- Handles communication with child components via Input() and Output() signals.
- Stores and retrieves tasks from localStorage for persistence.

TaskInputComponent (Child):
- Provides an input field and button to add new tasks.
- Emits events to the parent component when a task is added.
- Includes validation to prevent empty task submissions.

TaskListComponent (Child):
- Displays the list of tasks with checkboxes for completion and buttons for deletion.
- Supports task editing (bonus feature).
- Emits events to the parent for task deletion and updates.

Technical Details:
- Framework: Angular with TypeScript for robust component-based development.
- Component Communication: Utilizes Input() and Output() signals for parent-child interactions.
- Data Persistence: Leverages localStorage to maintain tasks across sessions.
- Error Handling: Prevents empty task submissions and provides user feedback.
- Control Flow: Uses Angular's control-flow syntax for efficient task rendering.
- Styling: Implements a professional color theme with Tailwind CSS (or custom CSS) and hover effects.
- Animations: Adds subtle transitions for task additions, deletions, and updates.
- Bonus Features: Includes task editing functionality for enhanced usability.


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
