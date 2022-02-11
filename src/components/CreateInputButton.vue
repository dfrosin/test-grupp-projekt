<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const newTask = ref('')
      const input = [
        {
          done: false,
          content: ''
        }
      ]
      const tasksData = JSON.parse(localStorage.getItem('tasks')) || input
      const tasks = ref(tasksData)
      function addTask() {
        if (newTask.value) {
          tasks.value.push({
            done: false,
            content: newTask.value
          })
          newTask.value = ''
        }
        saveData()
      }
      function inputTrue() {
        // isTrue = true isTrue is not defined :(
        console.log(
          'THE FUNCTION IS CALLED BUT THE FUCKING VARIABLE IS NOT DEFINED?? HOW TO RETURN A VARIABLE IN SETUP???'
        )
      }
      // function doneTask(task) {
      //   task.done = !task.done
      //   saveData()
      // }
      function removeTask(index) {
        tasks.value.splice(index, 1)
        saveData()
      }
      function saveData() {
        const storageData = JSON.stringify(tasks.value)
        localStorage.setItem('tasks', storageData)
      }

      return {
        isTrue: false, //how to return this cause its undefined in function inputTrue
        tasks,
        newTask,
        inputTrue,
        addTask,
        // doneTask,
        removeTask,
        saveData
      }
    }
  }
</script>

<template>
  <div class="div1">
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
  </div>
</template>

<style lang="scss" scoped>
  .div1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .div2 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
