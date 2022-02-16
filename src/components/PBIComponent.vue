<template>
  <div class="component">
    <h1>Product Backlog</h1>
    <div class="edit">
      <div class="h2-container" v-if="isH2Visible">
        <h2 class="exampleText" v-if="isVisible">Project Name</h2>
        <h2
          v-if="!isVisible"
          @mouseenter="toolTipOpen"
          @mouseleave="toolTipClose"
          @click="editName"
        >
          {{ pbHeading }}
        </h2>
      </div>
      <input
        class="editInput"
        v-if="editProjectName"
        v-model="pbHeading"
        @keyup.enter="backToBasic"
      />
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
    <button
      v-if="arrayOfObjects.length >= 1"
      class="btn btn-secondary"
      @click="createAccount"
    >
      Create Tasks
    </button>
  </div>
</template>

<script>
  import { db, firestore } from '../firebase'
  import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
  import { v4 as uuidv4 } from 'uuid'
  // import store from '../store'

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
        editProjectName: false,
        isH2Visible: true
      }
    },
    methods: {
      createList() {
        this.$store.commit('setProjectName', this.pbHeading)
        this.backlogItemInfo.id = this.pbItem
        this.backlogItemInfo.docId = uuidv4()
        let copiedObject = JSON.parse(JSON.stringify(this.backlogItemInfo))
        this.arrayOfObjects.push(copiedObject)
        this.pbItem = ''
      },
      createAccount() {
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        this.$store.commit('setArrayOfObjects', this.arrayOfObjects)
        this.arrayOfObjects.forEach((allDocs) => {
          setTimeout(() => {
            const whereToAddData = doc(
              firestore,
              `${this.pbHeading}/${allDocs.id}`
            )
            setDoc(whereToAddData, allDocs)
          }, 2000)
        })
        this.$router.push('/createsprint')
      },
      //Snapshot of all documents as Objects & Keys.

      getDatabase() {
        const colRef = collection(db, 'PBI')

        getDocs(colRef).then((snapshot) => {
          let PBI = []
          snapshot.docs.forEach((doc) => {
            PBI.push({ ...doc.data(), id: doc.id })
          })
          this.arrayOfObjects = PBI
        })
      },
      deleteItem(e) {
        this.deleted = true
        let deleteItemId = e.target.id
        var filtered = this.arrayOfObjects.filter(function (el) {
          return el.id != deleteItemId
        })
        this.arrayOfObjects = filtered
      },

      editName() {
        this.showToolTip = false
        this.isH2Visible = false
        this.editProjectName = true
        this.isVisible = false
        this.$store.commit('setProjectName', this.pbHeading)
        console.log(this.$store.state.projectName)
      },
      visible() {
        this.isVisible = false
      },
      toolTipOpen() {
        this.showToolTip = true
      },
      toolTipClose() {
        this.showToolTip = false
      },
      backToBasic() {
        this.isH2Visible = true
        this.editProjectName = false
      }
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
      .exampleText {
        color: rgba(255, 255, 255, 0.171);
      }
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
        color: rgb(255, 255, 255);
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
      border: 1px solid white;
      background-color: rgba(188, 130, 235, 0.315);
      color: white;
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
      grid-row: 3;
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: 2rem;
      width: 30rem;
      align-self: center;
      margin-left: 2rem;
    }
    .first-input {
      grid-row: 4;
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: 2rem;
      width: 30rem;
      align-self: center;
      margin-left: 2rem;
    }
    .editInput {
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: calc(1.325rem + 0.9vw);
      width: 20rem;
      align-self: center;
      margin-left: 2rem;
    }
    h1 {
      padding: 4rem;
      color: #ffff;
    }
    .btn {
      grid-column: 2;
      grid-row: 9;
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
