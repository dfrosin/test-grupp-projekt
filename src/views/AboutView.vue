<script>
  import { /*  mapGetters, */ mapActions } from 'vuex'
  /* import { db, firestore } from '../firebase'
  import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
  import { v4 as uuidv4 } from 'uuid'
  import store from '../store' */

  export default {
    name: 'TodosAboutview',
    data() {
      return {
        pbItem: '',
        pbHeading: '',
        backlogItemInfo: {},
        deletedArray: [],
        arrayOfObjects: [],
        isDeleted: false,
        editMode: false,
        isVisible: true,
        showToolTip: false,
        newName: '',
        editProjectName: false,
        isH2Visible: true,
        setloading: false
      }
    },
    methods: {
      ...mapActions(['createList', 'deleteItem', 'createAccount', 'editName']),

      //Snapshot of all documents as Objects & Keys.

      visible() {
        this.isVisible = false
      },
      toolTipOpen() {
        this.showToolTip = true
      },
      toolTipClose() {
        this.showToolTip = false
      }
    }
    /*  computed: mapGetters(['allTodos']), */
  }
</script>

<template>
  <div class="component">
    <h1>Product Backlog</h1>
    <div class="edit">
      <div class="h2-container" v-if="isH2Visible">
        <h2 v-if="isVisible">Project Name</h2>
        <h2
          v-if="!isVisible"
          @mouseenter="toolTipOpen"
          @mouseleave="toolTipClose"
          @click="editName"
        >
          {{ pbHeading }}
        </h2>
      </div>
      <input v-if="editProjectName" v-model="newName" />
      <div v-if="showToolTip" class="tool-tips">
        <span class="tool-tiptext">Edit Name</span>
      </div>
    </div>

    <input
      v-if="isVisible"
      v-model="pbHeading"
      class="pbHeading"
      @keyup.enter="visible"
      placeholder="Project Name"
    />
    <input
      v-if="pbItem"
      v-model="pbItem"
      class="first-input"
      type="text"
      placeholder="Som en ___ vill jag ___ för att ___"
      ref="firstInput"
      @keyup.enter="createList(this.pbitem)"
    />

    <div class="backlog-container">
      <ul>
        <li v-for="item in arrayOfObjects" :key="item.idxd">
          {{ item.id }}
          <img
            src="/assets/trash-can.png"
            alt=""
            @click="deleteItem"
            :id="item.id"
          />
        </li>
      </ul>
    </div>
    <ButtonComponent buttonvalue="Create Task" />
  </div>
</template>

<style lang="scss" scoped>
  .component {
    .h2-container {
      border: 1px solid black;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(10, 1fr);
    background-color: rgba(255, 235, 205, 0.39);
    width: 85%;
    height: 80vh;
    margin: auto;
    margin-top: 10rem;
    .edit {
      display: flex;
      width: 20rem;
      align-self: center;
      justify-self: center;
      cursor: pointer;
      h2 {
        grid-row: 1;
        grid-column: 2;
        align-self: center;
        justify-self: center;
        color: rgba(255, 255, 255, 0.507);
        margin-right: 10px;
      }
      .tool-tips {
        width: 8rem;
        height: 3rem;
        background-color: rgba(83, 87, 105, 0.315);
        color: #fff;
        justify-content: center;
        align-content: center;
        padding: 5px 0;
        border-radius: 6px;
        margin-right: 1rem;

        .tool-tiptext {
          font-size: 1.2rem;
          padding: 10px;
        }
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      list-style: none;
      background-color: rgba(255, 255, 255, 0.76);
      color: black;
      padding: 10px;
      margin-top: 10px;
      width: 80%;
      min-height: 3rem;
      border-radius: 10px;
      font-size: 1.3rem;
      img {
        width: 15px;
        height: 15px;
        cursor: pointer;
        margin: 2px;
      }
    }
    .pbHeading {
      grid-row: 2;
      background-color: rgba(255, 255, 255, 0);
      border-bottom: 2px solid rgb(250, 246, 246);
      font-size: 1.3rem;
      width: 20rem;
      align-self: center;
      margin-left: 2rem;
    }

    .first-input {
      grid-row: 4;
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: 1.5rem;
      width: 20rem;
      align-self: center;
      margin-left: 2rem;
    }
    h1 {
      padding: 4rem;
      color: #ffff;
    }
    .btn {
      grid-column: 1;
      grid-row: 8;
      align-self: center;
      justify-self: center;
      width: 20rem;
      height: 4rem;
      border-radius: 20px;
      font-size: 1.4rem;
    }
    .backlog-container {
      grid-column: 2;
      grid-row: 2/10;
      height: 40rem;
      overflow-y: scroll;
      .pb-item {
        grid-row: 9;
        padding: 0.3rem;
        border-radius: 10px;
        font-size: 1.3rem;
        width: 30rem;
        margin-left: 3.5rem;
      }
    }
  }
</style>

<!-- <script>
  import { mapGetters, mapActions } from 'vuex'
  import ButtonComponent from '../components/ButtonComponent.vue'
  export default {
    name: 'TodosAboutview',
    components: { ButtonComponent },
    methods: {
      ...mapActions(['createList', 'deleteItem', 'createAccount'])
    },
    computed: mapGetters(['allTodos'])
  }
</script> -->
