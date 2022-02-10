<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const items = ref([
        { id: 0, title: 'Create Navbar', list: 1 },
        { id: 1, title: 'Create Drag and drop function', list: 2 },
        { id: 2, title: 'Create Footer', list: 3 },
        { id: 3, title: 'Set up Backend with Firebase', list: 4 }
      ])

      const getList = (list) => {
        return items.value.filter((item) => item.list == list)
      }
      const startDrag = (event, item) => {
        console.log(item)
        event.dataTransfer.dropEffect = 'moved'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', item.id)
      }
      const onDrop = (event, list) => {
        const itemID = event.dataTransfer.getData('itemID')
        const item = items.value.find((item) => item.id == itemID)
        item.list = list
      }
      return {
        getList,
        onDrop,
        startDrag
      }
    }
  }
</script>

<template>
  <article class="flex-container">
    <section>
      <h3>Todo</h3>
      <div
        class="drop-zone"
        @drop="onDrop($event, 1)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div
          v-for="item in getList(1)"
          :key="item.id"
          class="drag-element"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
    <section>
      <h3>In Progress</h3>
      <div
        class="drop-zone"
        @drop="onDrop($event, 2)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div
          v-for="item in getList(2)"
          :key="item.id"
          class="drag-element"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
    <section>
      <h3>Review</h3>
      <div
        class="drop-zone"
        @drop="onDrop($event, 3)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div
          v-for="item in getList(3)"
          :key="item.id"
          class="drag-element"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
    <section>
      <h3>Done</h3>
      <div
        class="drop-zone"
        @drop="onDrop($event, 4)"
        @dragenter.prevent
        @dragover.prevent
      >
        <div
          v-for="item in getList(4)"
          :key="item.id"
          class="drag-element"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
  h3 {
    color: black;
    margin: 3rem 0 1rem 0;
  }
  .flex-container {
    background-color: rgba(235, 235, 235, 0.3);
    margin: auto;
    height: 85rem;
    width: 150rem;
    display: flex;
    justify-content: space-between;
    margin-top: 10rem;
    text-align: center;
    border-radius: 10px;
    flex-wrap: wrap;
  }

  .drop-zone {
    background-color: rgb(175, 175, 175);
    display: flex;
    height: 75rem;
    width: 30rem;
    color: black;
    display: flex;
    border-radius: 10px;
    flex-wrap: wrap;
  }

  .drag-element {
    font-size: 1.5rem;
    text-align: center;
    color: black;
    width: 30rem;
    height: 7rem;
  }

  .drag-el:nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
<!-- Todo:
1. Skapa en vit jävla bakgrund med opacity så den är genomskinlig.
2. skapa en section som innehåller allt.
3. skapa divar.
4. divarna ska ingå i flex-grid. (Space between? Kanske får se.)
 -->
