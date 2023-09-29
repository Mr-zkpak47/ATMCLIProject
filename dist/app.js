import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import Table from "cli-table";
let todos = [];
let exit = true;
const viewTodos = () => {
    const table = new Table({
        chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' },
        style: { 'padding-left': 1, 'padding-right': 1 },
        head: ["#", "Todo"],
        colWidths: [5, 40], // Adjust column widths as needed
    });
    for (let i = 0; i < todos.length; i++) {
        table.push([(i + 1).toString(), todos[i]]);
    }
    console.log(table.toString());
};
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
const handleSpinner = async (start, stop) => {
    const spinner = createSpinner(`${start}`).start();
    await sleep();
    spinner.success({ text: `${stop}` });
};
const welcome = async () => {
    console.clear();
    let rainbowTitle = chalkAnimation.rainbow(`Let's use ATM : `);
    await sleep();
    rainbowTitle.stop();
    console.log(`  ╭────────────────────────────╮
  │     .----------------.     │
  │     |  Welcome to    |     │
  │     |   The Bank     |     │
  │     |   of ASCII     |     │
  │     '----------------'     │
  │        .--------.          │
  │       |  __ATM__ |         │
  │       | |       ||         │
  │       | | █████ ||         │
  │       | | █████ ||         │
  │       | | █████ ||         │
  │       | | █████ ||         │
  │       | | █████ ||         │
  │       | | █████ ||         │
  │       | |       ||         │
  │       |_|_______||         │
  │      |    |   |    |       │
  │      |    |   |    |       │
  │      |____|   |____|       │
  │          [     ]           │
  │          [_____]           │
  ╰────────────────────────────╯`);
    let karaokeTitle = chalkAnimation.neon(`

  █▀▄ █▀▀ █░█ █▀▀ █░░ █▀█ █▀█   █▄▄ █▄█   ▀█ █▀█ █░█ ▄▀█ █ █▄▄
  █▄▀ ██▄ ▀▄▀ ██▄ █▄▄ █▄█ █▀▀   █▄█ ░█░   █▄ █▄█ █▀█ █▀█ █ █▄█
  `, 1);
    await sleep();
    karaokeTitle.stop();
};
const getTodos = async () => {
    const Todos = await inquirer.prompt({
        type: "input",
        name: "todo",
        message: "Enter a todo : ",
    });
    todos.push(Todos.todo);
};
const TodoFunc = async () => {
    const res = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select the option : ",
        choices: ["Add", "Update", "Delete", "View", "Exit"],
    });
    if (res.select == "Add") {
        await getTodos();
        await handleSpinner("Adding Todo...", chalk.green("Todo Added Successfully."));
    }
    if (res.select == "Update") {
        const spinner1 = createSpinner("Checking TodoList...").start();
        await sleep();
        if (todos.length !== 0) {
            spinner1.stop();
            const res = await inquirer.prompt({
                type: "list",
                name: "msg",
                message: "Choose the todo you want to update : ",
                choices: todos.map((todo) => todo),
            });
            const update = await inquirer.prompt({
                type: "input",
                name: "updated",
                message: "Enter the text you want to replace : ",
            });
            let newTodo = todos.filter((todo) => todo !== res.msg);
            todos = [...newTodo, update.updated];
            await handleSpinner("Updating Todo...", chalk.green("Todo Updated Successfully."));
        }
        else {
            spinner1.error({ text: chalk.red("The todo list is empty.") });
        }
    }
    if (res.select == "Delete") {
        const spinner2 = createSpinner("Checking TodoList...").start();
        await sleep();
        if (todos.length !== 0) {
            spinner2.stop();
            const res = await inquirer.prompt({
                type: "list",
                name: "todo",
                message: "Choose the todo you want to delete : ",
                choices: todos.map((todo) => todo),
            });
            const newTodos = todos.filter((todo) => todo !== res.todo);
            todos = [...newTodos];
            await handleSpinner("Deleting Todo...", chalk.green("Todo Deleted Successfully."));
        }
        else {
            spinner2.error({ text: chalk.red("The todo list is empty.") });
        }
    }
    if (res.select == "View") {
        const spinner3 = createSpinner("Checking TodoList...").start();
        await sleep();
        if (todos.length !== 0) {
            spinner3.stop();
            // console.log(chalk.blueBright(todos));
            viewTodos();
        }
        else {
            spinner3.error({ text: chalk.red("The todo list is empty.") });
        }
    }
    if (res.select == "Exit") {
        handleSpinner("Exiting...", "ATM Machine Closed.");
        exit = false;
    }
};
await welcome();
do {
    await TodoFunc();
} while (exit);
