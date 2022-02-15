<template>
  <div class="component">
    <h1>Product Backlog</h1>
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
    <ButtonComponent buttonvalue="Create Task" />
    <button @click="createAccount">Skicka in</button>
  </div>
</template>

<script>
  import ButtonComponent from './ButtonComponent.vue'
  import { db, firestore } from '../firebase'
  import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    data() {
      return {
        pbItem: '',
        backlogItemInfo: {
          id: '',
          docId: '',
          deleteId: ''
        },
        deletedArray: [],
        arrayOfObjects: [],
        isDeleted: false
      }
    },
    methods: {
      createList() {
        this.backlogItemInfo.id = this.pbItem
        this.backlogItemInfo.docId = uuidv4()
        let copiedObject = JSON.parse(JSON.stringify(this.backlogItemInfo))
        this.arrayOfObjects.push(copiedObject)
        this.pbItem = ''
      },
      createAccount() {
        // --------------- SKAPA NY ANVÄNDARE------------------------------ //
        this.arrayOfObjects.forEach((allDocs) => {
          setTimeout(() => {
            const whereToAddData = doc(firestore, `PBI/${allDocs.id}`)
            setDoc(whereToAddData, allDocs)
          }, 2000)
        })
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
          console.log(PBI)
        })
      },
      deleteItem(e) {
        this.deleted = true
        let deleteItemId = e.target.id
        var filtered = this.arrayOfObjects.filter(function (el) {
          return el.id != deleteItemId
        })
        this.arrayOfObjects = filtered
      }
    },
    components: { ButtonComponent }
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
    .first-input {
      grid-row: 4;
      grid-column: 1;
      padding: 0.3rem;
      border-radius: 10px;
      font-size: 1.8rem;
      width: 30rem;
      margin-left: 3.5rem;
      align-self: center;
    }
    h1 {
      padding: 4rem;
    }
    .btn {
      grid-column: 1;
      grid-row: 8;
      align-self: center;
      justify-self: center;
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
        font-size: 1.8rem;
        width: 30rem;
        margin-left: 3.5rem;
      }
    }
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    background-color: #ffff;
    color: black;
    padding: 3px;
    margin-top: 10px;
    width: 30rem;
    height: 3rem;
    border-radius: 10px;
    font-size: 1.8rem;
    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
</style>
