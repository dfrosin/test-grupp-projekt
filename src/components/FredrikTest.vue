<!--  <div class="form-task-container">
    <form @submit.prevent="submit">
      <div class="item-field">
        <label for task>make new task</label>
        <input
          v-if="isTrue"
          placeholder="Enter name here"
          type="text"
          name="name"
          id="name_field"
          class="nes-input"
          v-model="newTask"
        />
      </div>
      <Button text="add task" color="greenS" />
    </form>
    <div id="todoList">
      <div :class="{ completed: task.completed }">
        <span>{{ task.text }}</span>
      </div>
    </div>
  </div> -->

<!--  <div class="div1">
    <button @click="inputTrue" class="btn btn-primary mt-3">Create Task</button>
    <input v-if="isTrue === true" v-model="newTask" name="newTask" />
    <button v-if="newTask" @click="addTask" class="btn btn-primary mt-3">
      Add task
    </button>
  </div>
  <div class="div2">
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span :class="{ done: task.done }" @click="doneTask"
          >hej{{ task.content }}</span
        >
        <button @click="removeTask" class="btn btn-primary mt-3">Remove</button>
      </li>
    </ul>
  </div> -->
<!-- </template> -->
<!--
<template>
  <div id="appContainer">
    <h1>ToDo List</h1>
    <form @submit.prevent="addTodos()">
      <input v-model="newTodo" />
      <button class="waves-effect waves-light btn">Add ToDo</button>
    </form>
    <div id="todoList">
      <div
        :class="{ completed: todo.complete }"
        v-for="(todo, index) in todos"
        :key="index"
        @click="completedTodo(todo)"
      >
        <div class="row">
          <div class="col s12 m6">
            <div class="card teal teal lighten-1">
              <div class="card-content white-text">
                <span class="card-title">{{ todo.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-if="todos.length === 0">Empty list, please enter some tasks</p>
    <button
      class="btn waves-effect waves-light red lighten-2"
      v-if="todos.length !== 0"
      @click="removeTodos"
    >
      Remove All Todos
    </button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'App',
    setup() {
      const newTodo = ref('')
      const initialLoadData = [
        {
          complete: false,
          text: 'Create todo list functionality'
        }
      ]
      let stroedTodos
      localStorage.getItem('todos')
        ? (stroedTodos = JSON.parse(localStorage.getItem('todos')))
        : (stroedTodos = initialLoadData)

      const todos = ref(stroedTodos)

      function addTodos() {
        if (newTodo.value !== '') {
          todos.value.push({
            complete: false,
            text: newTodo.value
          })
          newTodo.value = ''
          updateStorage()
        }
      }
      function removeTodos() {
        todos.value.splice(0, todos.value.length)
        updateStorage()
      }
      function completedTodo(todo) {
        todo.complete = !todo.complete
        updateStorage()
      }
      function updateStorage() {
        localStorage.setItem('todos', JSON.stringify(todos.value))
      }
      return {
        completedTodo,
        removeTodos,
        addTodos,
        todos,
        newTodo
      }
    }
  }
</script>
-->

<!-- <style lang="scss" scoped></style> -->
