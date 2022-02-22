<!--
  1.Skapa en overview för profil med namn, profilbild, kontaktuppgifter osv.
  2.Skapa möjligheten att ändra namn och kontaktuppgifter med inputfält.
  3.Skapa en overview med vilka tasks man har och hur långt det är
  kvar på sprinten.

-->
<template>
  <div class="profile-card">
    <h1>My Profile</h1>
    <div class="information-container">
      <div class="img-container">
        <img v-if="uploading === false" :src="url" alt="profile picture" />
        <img
          v-if="uploading === true"
          :src="newPhoto"
          alt="new profile picture"
        />
        <div class="upload-buttons" v-if="editing === true">
          <input
            class="edit-button"
            type="file"
            @change="previewPhoto"
            accept="image/png, image/jpeg"
          />
          <button
            v-if="this.newPhoto !== null"
            @click="savePhoto"
            type="submit"
          >
            save
          </button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="editing === false" class="saved-information">
          <p>{{ userCollection.userName }}</p>
          <p>{{ userCollection.fullName }}</p>
          <p>{{ userCollection.email }}</p>
        </div>
        <div v-if="editing === true" class="editing-information">
          <input type="text" v-model="userCollection.userName" />
          <input type="text" v-model="userCollection.fullName" />
        </div>
        <div class="buttons">
          <button v-if="editing === true" @click="onSave">save</button>
          <button v-if="editing === false" @click="onEdit">edit</button>
          <button v-if="editing === true" @click="onCancel">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile-card {
    font-family: Roboto, sans-serif;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.31);
    width: 80%;
    margin: 0 10%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    padding-bottom: 20px;
    .information-container {
      width: 80%;
      margin: 0 10%;
      display: flex;
      flex-wrap: wrap;
    }
    h1 {
      text-align: center;
      width: 60%;
      margin-left: 20%;
      margin-top: 2rem;
    }
    button {
      background-color: transparent;
      color: white;
      height: 2rem;
      width: 2rem;
      margin-right: 2rem;
      margin-top: 1rem;
    }
    .buttons {
      display: flex;
      width: 100%;
      text-align: center;
      // margin-left: auto;
      // margin-right: 5px;
      button {
        padding: 0;
        margin: 0;
        height: 20px;
        width: 20px;
        margin-left: 10px;
      }
    }
    .img-container {
      display: flex;
      max-width: 200px;
      height: 200px;
      justify-content: center;
      text-align: center;
      margin: auto;
      flex-wrap: wrap;
      .upload-buttons {
        background-color: rgba(0, 0, 0, 0.2);
        height: 15rem;
        width: 15rem;
        margin-top: 7.5px;
        border-radius: 7.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        .edit-button {
          width: 150px;
          padding-left: 7px;
          background-color: transparent;
        }
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 75px;
        margin: 5%;
        object-fit: cover;
      }
    }
    .card-body {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10%;

      .saved-information {
        width: 20rem;
        margin-top: 1.8px;
        gap: 10px;
        flex-direction: column;
        p {
          height: 20px;
          width: 20rem;
          font-size: 1rem;
          background-color: transparent;
          border-bottom: 2px solid rgba(255, 255, 255, 0);
          width: 80%;
          color: white;
          margin: 0;
          padding: 0;
          margin-left: 10px;
        }
      }
      .editing-information {
        width: 20rem;
        gap: 10px;
        flex-direction: column;
        input {
          height: 20px;
          width: 20rem;
          font-size: 1rem;
          background-color: transparent;
          border-bottom: 2px solid white;
          width: 80%;
          color: white;
          margin: 0;
          padding: 0;
          margin-left: 10px;
        }
        ::placeholder {
          color: white;
        }
      }
    }
  }
</style>

<script>
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from 'firebase/storage'
  import { firestore } from '../firebase'
  import { doc, setDoc } from 'firebase/firestore'

  const storage = getStorage()

  export default {
    data() {
      return {
        editing: false,
        uploading: false,
        newPhoto: null,
        url: null,
        file: null,
        fullnameCopy: '',
        userNameCopy: '',
        userCollection: {}
      }
    },
    mounted() {
      this.userCollection = { ...this.$store.state.loggedInUser }
      if (this.userCollection === null) {
        this.$router.push('/login')
      }
      console.log(this.$store.state.loggedInUser)
      this.url = this.$store.state.loggedInUser.profilePicture
    },
    methods: {
      onEdit() {
        this.editing = true
        this.fullnameCopy = this.userCollection.fullName.slice()
        this.userNameCopy = this.userCollection.userName.slice()
      },
      onCancel() {
        this.userCollection.fullName = this.fullnameCopy
        this.userCollection.userName = this.userNameCopy
        this.editing = false
        this.uploading = false
        this.newPhoto = null
      },
      onSave() {
        this.editing = false
        const whereToAddData = doc(
          firestore,
          `users/${this.userCollection.userId}`
        )
        setDoc(whereToAddData, this.userCollection)
        this.$store.commit('setLoggedInUser', this.userCollection)
        this.userCollection = { ...this.$store.state.loggedInUser }
      },
      previewPhoto(photo) {
        this.file = photo.target.files[0]
        this.uploading = true
        const imageFile = photo.target.files[0]
        this.newPhoto = URL.createObjectURL(imageFile)
      },
      savePhoto() {
        this.url = this.newPhoto
        this.uploading = false
        this.newPhoto = null
        console.log(this.file)
        const storageRef = ref(
          storage,
          `${this.$store.state.loggedInUser.userName}`
        )
        uploadBytes(storageRef, this.file).then(() => {
          console.log('Uploaded a picture')
          getDownloadURL(
            ref(storage, `${this.$store.state.loggedInUser.userName}`)
          ).then((url) => {
            this.url = url
            this.userCollection.profilePicture = this.url
            console.log(this.url)
          })
        })
      }
    }
  }
</script>
