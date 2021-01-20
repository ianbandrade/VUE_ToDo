import { ref } from 'vue';

    export default {
        name: 'App',

        setup () {
            const newTodo = ref('');
            const defaultData = [{
                done: false,
                content: 'Add a toDo :)'
            }]
            const todosData = JSON.parse(localStorage.getItem('todos')) || defaultData;
            const todos = ref(todosData);
            function addTodo () {
                if (newTodo.value) {
                    todos.value.push({
                        done: false,
                        content: newTodo.value
                    });
                    newTodo.value = '';
                } 
                saveData();
            }
            function doneTodo (todo) {
                todo.done = !todo.done
                saveData();
            }
            function removeTodo (index) {
                todos.value.splice(index, 1);
                saveData();
            }
            function saveData () {
                const storageData = JSON.stringify(todos.value);
                localStorage.setItem('todos', storageData);
            }
            return {
                todos,
                newTodo,
                addTodo,
                doneTodo,
                removeTodo,
                saveData
            }
        }
    }
