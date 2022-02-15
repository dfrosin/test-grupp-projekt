<template>
  <div class="component">
    <h1>Product Backlog</h1>

    <div class="edit">
      <h2 v-if="isVisible">Project Name</h2>
      <h2
        v-if="!isVisible"
        @mouseenter="toolTipOpen"
        @mouseleave="toolTipClose"
        @click="editName"
      >
        {{ pbHeading }}
      </h2>
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
      v-model="pbItem"
      class="first-input"
      type="text"
      placeholder="Som en ___ vill jag ___ för att ___"
      ref="firstInput"
      @keyup.enter="createList"
    />
    <div class="backlog-container">
      <ul>
        <li v-for="items in arrayOfObjects" :key="items.idex">
          {{ items.id }}
          <img src="/assets/trash-can.png" @click="deleteItem" :id="items.id" />
        </li>
      </ul>
    </div>
    <button class="btn btn-primary" @click="createAccount">Create Tasks</button>
  </div>
</template>

<script>
  /*  import { db, firestore } from '../firebase'
    import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
    import { v4 as uuidv4 } from 'uuid'
    import store from '../store' */
  /* import { mapGetters } from 'vuex' */
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        pbItem: '',
        pbHeading: '',
        backlogItemInfo: {
          id: '',
          docId: '',
          deleteId: ''
        },
        deletedArray: [],
        arrayOfObjects: [],
        isDeleted: false,
        editMode: false,
        isVisible: true,
        showToolTip: false,
        newName: '',
        editProjectName: false
      }
    },
    methods: {
      ...mapActions(['createList', 'getTest', 'getDatabase', 'deleteItem']),

      getTest() {
        this.$store.dispatch('createAccount')
      },

      getDatabase() {
        this.$store.dispatch('getDatabase')
      },

      deleteItem(e) {
        let deleteItemId = e.target.id

        var filtered = this.arrayOfObjects.filter(function (el) {
          return el.id != deleteItemId
        })
        this.arrayOfObjects = filtered
      }
      /* editName() {
        this.editProjectName = true
        this.isVisible = false
        store.commit('setProjectName', this.pbHeading)
        console.log(store.state.projectName)
      },
      visible() {
        this.isVisible = false
      },
      toolTipOpen() {
        this.showToolTip = true
      },
      toolTipClose() {
        this.showToolTip = false
      } */
    }
  }
</script>

<style lang="scss" scoped>
  .component {
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
      background-color: rgba(255, 255, 255, 0);
      border-bottom: 2px solid rgb(250, 246, 246);
      font-size: 1.3rem;
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
