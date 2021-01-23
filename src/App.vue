<template>
  <h1>ToDo App</h1>
  <form @submit.prevent="addTodo(), toastSuccess('Task added!')">
    <label>New ToDo </label>
    <input
      @keydown.space.prevent
      v-model="newTodo"
      name="newTodo"
      autocomplete="off"
    />
    <button :disabled="!newTodo">Add ToDo</button>
  </form>
  <h2>List</h2>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span
        :class="{ done: todo.done }"
        @click="
          doneTodo(todo),
            !todo.done
              ? toastSuccess('Task unchecked!')
              : toastSuccess('Task checked!')
        "
        >{{ todo.content }}</span
      >
      <button @click="removeTodo(index), toastSuccess('Task removed!')">
        Remove
      </button>
    </li>
  </ul>
  <h4 v-if="todos.length === 0">Empty list.</h4>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  methods: {
    toastSuccess: function(message) {
      this.$toast.show(message, {
        type: 'success',
        position: 'top',
        duration: 1500,
        maxToasts: 1,
      });
    },
  },
  setup() {
    const newTodo = ref('');
    const defaultData = [
      {
        done: false,
        content: 'Type a task! :)',
      },
    ];
    const todosData = JSON.parse(localStorage.getItem('todos')) || defaultData;
    const todos = ref(todosData);

    const addTodo = () => {
      if (newTodo.value) {
        todos.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
      }
      saveData();
    };

    const doneTodo = (todo) => {
      todo.done = !todo.done;

      saveData();
    };

    const removeTodo = (index) => {
      todos.value.splice(index, 1);
      saveData();
    };

    const saveData = () => {
      const storageData = JSON.stringify(todos.value);
      localStorage.setItem('todos', storageData);
    };

    return {
      todos,
      newTodo,
      addTodo,
      doneTodo,
      removeTodo,
      saveData,
    };
  },
};
</script>

<style lang="scss">
$border: 2px solid
  rgba(
    $color: #99bbd6,
    $alpha: 0.35,
  );

$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #4075a0;
$textColor: #ebfcfe;
$primaryColor: #bbeff2;
$secondTextColor: #1d3549;

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    h1 {
      font-weight: bold;
      font-size: 26px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 14px;
        font-weight: bold;
      }
      input,
      button {
        transition: 0.5s;
        height: $size5;
        box-shadow: none;
        outline: none;
        padding-left: $size2;
        padding-right: $size2;
        border-radius: $size3;
        font-size: 18px;
        margin-top: $size1;
        margin-bottom: $size2;
      }
      button:disabled {
        opacity: 0.1;
        transition: 1s;
      }
      input {
        background-color: transparent;
        border: $border;
        color: inherit;
      }
    }
    button {
      cursor: pointer;
      background-color: $primaryColor;
      border: 1px solid $primaryColor;
      color: $secondTextColor;
      font-weight: bold;
      outline: none;
      border-radius: $size3;
    }
    h2 {
      text-align: center;
      font-size: 22px;
      border-bottom: $border;
      padding-bottom: $size1;
      margin-top: 50px;
    }
    ul {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $border;
        padding: $size2 $size4;
        border-radius: $size3;
        margin-bottom: $size2;
        span {
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
        }
        button {
          font-size: $size2;
          padding: $size1;
        }
      }
    }
    h4 {
      text-align: center;
      opacity: 0.5;
      margin: 0;
    }
  }
}
</style>
