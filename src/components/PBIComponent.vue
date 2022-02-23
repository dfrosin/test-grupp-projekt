<template>
  <div class="component">
    <div class="column">
      <h1>Product Backlog</h1>
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
        :style="{ borderColor: getColor }"
      />
      <div v-if="getColor !== ''" class="color-message">
        <p>Selected color</p>
        <div class="color" :style="{ backgroundColor: getColor }" />
      </div>
      <div v-if="getColor === ''" class="color-message">
        <p>Please select a color first!</p>
      </div>

      <div class="container-container">
        <div class="color-container">
          <div
            class="color"
            v-for="color in colorArray"
            :key="color.id"
            :style="{ backgroundColor: color }"
            @click="selectColor"
          />
        </div>
      </div>
    </div>
    <div class="column">
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
      <div class="backlog-container">
        <ul>
          <li
            v-for="item in arrayOfObjects"
            :key="item.idxd"
            :style="{ borderColor: item.color }"
          >
            {{ item.id }}
            <img
              src="/assets/trash-can.png"
              alt=""
              @click="deleteItem"
              :id="item.id"
              :style="{ borderColor: item.color }"
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
          deleteId: '',
          color: ''
        },
        colorArray: [
          'rgb(255, 255, 255)',
          'rgb(177, 177, 177)',
          'rgb(161, 40, 181)',
          'rgb(255, 91, 219)',
          'rgb(152, 143, 255)',
          'rgb(255, 107, 107)',
          'rgb(255, 204, 129)',
          'rgb(255, 242, 124)',
          'rgb(172, 255, 190)',
          'rgb(48, 214, 174)',
          'rgb(6, 170, 221)',
          'rgb(0, 0, 0)'
        ],
        deletedArray: [],
        arrayOfObjects: [],
        isDeleted: false,
        editMode: false,
        isVisible: true,
        showToolTip: false,
        newName: '',
        editProjectName: false,
        isH2Visible: true,
        getColor: '',
        errorMessage: false
      }
    },
    methods: {
      createList() {
        if (this.getColor !== '') {
          this.$store.commit('setProjectName', this.pbHeading)
          this.backlogItemInfo.color = this.getColor
          this.backlogItemInfo.id = this.pbItem
          this.backlogItemInfo.docId = uuidv4()
          let copiedObject = JSON.parse(JSON.stringify(this.backlogItemInfo))
          this.arrayOfObjects.push(copiedObject)
          this.pbItem = ''
          this.getColor = ''
          this.errorMessage = false
        }
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
        this.submitProjectName()
      },
      submitProjectName() {
        const allDocs = { project: 'project' }
        const whereToAddData = doc(firestore, `projects/${this.pbHeading}`)
        setDoc(whereToAddData, allDocs)
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
        this.colorArray.push(e.target.style.borderColor)
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
      },
      selectColor(e) {
        if (this.getColor !== '') {
          this.colorArray.push(this.getColor)
          this.getColor = ''
        }
        let color = e.target.style.backgroundColor
        this.getColor = color
        console.log(color)
        let index = this.colorArray.indexOf(color)
        this.colorArray.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  html,
  body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
  .component {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: rgba(255, 235, 205, 0.39);
    width: 85%;
    border-radius: 10px;
    margin: auto;
    margin-top: 10rem;
    padding-bottom: 40px;
    .column {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 360px;
    }
    .color-message {
      display: flex;
      .color {
        margin-top: 4px;
        border: 2px solid rgba(0, 0, 0, 0.3);
      }
    }
    .color {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .color:not(.color-message .color):hover {
      border: 1px solid rgb(131, 128, 128);
    }
    .container-container {
      background-color: rgba(255, 255, 255, 0.5);
      width: 108px;
      height: 82px;
      border-radius: 14px;
      padding: 3px;
      margin: 2rem;
      .color-container {
        display: flex;
        flex-wrap: wrap;
        width: 106px;
        gap: 2px;
      }
    }
    p {
      margin: 1rem;
      color: white;
    }
    .edit {
      .exampleText {
        color: rgba(255, 255, 255, 0.171);
      }
      display: flex;
      align-self: center;
      justify-self: center;
      cursor: pointer;
      h2 {
        color: rgb(255, 255, 255);
        padding: 4rem;
        width: 100%;
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
        position: fixed;
        margin-top: 35px;

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
      border: 3px solid white;
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
    ::placeholder {
      color: rgba(244, 244, 244, 0.606);
    }
    .pbHeading {
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: 2rem;
      width: 80%;
      align-self: center;
      margin-left: 2rem;
    }
    .first-input {
      background-color: transparent;
      border-bottom: 2px solid rgba(204, 201, 226, 0.616);
      color: #fff;
      font-size: 2rem;
      width: 80%;
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
      align-self: center;
      justify-self: center;
      width: 20rem;
      height: 4rem;
      border-radius: 20px;
      font-size: 1.4rem;
    }
    .backlog-container {
      height: 40rem;
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      margin-bottom: 20px;
      width: 100%;
    }
    .backlog-container::-webkit-scrollbar {
      display: none;
    }
  }
</style>
