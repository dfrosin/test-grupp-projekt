<!--
  1.Skapa en overview för profil med namn, profilbild, kontaktuppgifter osv.
  2.Skapa möjligheten att ändra namn och kontaktuppgifter med inputfält.
  3.Skapa en overview med vilka tasks man har och hur långt det är
  kvar på sprinten.

-->
<template>
  <div class="profile-card">
    <h1>My Profile</h1>
    <div class="buttons">
      <button v-if="editing === true" @click="onSave">save</button>
      <button v-if="editing === false" @click="onEdit">edit</button>
      <button v-if="editing === true" @click="onCancel">cancel</button>
    </div>
    <div class="img-container">
      <img v-if="uploading === false" :src="url" alt="profile picture" />
      <img
        v-if="uploading === true"
        :src="newPhoto"
        alt="new profile picture"
      />
      <div class="upload-buttons">
        <input
          id="editButton"
          v-if="editing === true"
          type="file"
          @change="previewPhoto"
          accept="image/png, image/jpeg"
        />
        <button v-if="this.newPhoto !== null" @click="savePhoto" type="submit">
          save
        </button>
      </div>
    </div>
    <div class="card-body">
      <div v-if="editing === false" class="saved-information">
        <p>{{ userCollection.fullName }}</p>
        <p>{{ userCollection.email }}</p>
      </div>
      <div v-if="editing === true" class="editing-information">
        <input type="text" v-model="userCollection.fullName" />
        <input type="email" v-model="userCollection.email" />
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
    edit-button {
      background-color: transparent;
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
      width: 20%;
      display: flex;
      justify-content: end;
      padding-right: 2rem;
    }
    .img-container {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: auto;
      flex-wrap: wrap;
      .upload-buttons {
        width: 15rem;
        display: flex;
        flex-direction: column;
        text-align: center;
      }
    }
    img {
      width: 15rem;
      height: 15rem;
      margin: 5%;
      border-radius: 7.5rem;
    }
    .card-body {
      margin-top: 10%;
      height: 10%;
      .saved-information {
        gap: 10px;
        flex-direction: column;
        p {
          height: 20px;
          width: 50%;
          border-bottom: 2px solid rgba(255, 255, 255, 0);
          margin: 0;
          padding: 0;
          font-size: 1rem;
          padding-left: 5px;
        }
      }
      .editing-information {
        input {
          height: 20px;
          width: 50%;
          font-size: 1rem;
          background-color: transparent;
          border-bottom: 2px solid white;
          width: 80%;
          color: white;
          margin: 0;
          padding: 0;
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
        nameCopy: '',
        emailCopy: '',
        userCollection: {}
      }
    },
    mounted() {
      if (this.$store.state.loggedInUser === null) {
        this.$router.push('/login')
      } else {
        this.userCollection = { ...this.$store.state.loggedInUser }
        console.log(this.$store.state.loggedInUser)
        this.url = this.$store.state.loggedInUser.profilePicture
      }
    },
    methods: {
      onEdit() {
        this.editing = true
        this.nameCopy = this.userCollection.fullName.slice()
        this.emailCopy = this.userCollection.email.slice()
      },
      onCancel() {
        this.userCollection.fullName = this.nameCopy
        this.userCollection.email = this.emailCopy
        this.editing = false
        this.uploading = false
        this.newPhoto = null
      },
      onSave() {
        this.editing = false
        const whereToAddData = doc(
          firestore,
          `users/${this.userCollection.userName}`
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
        this.userCollection.profilePicture = true
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
