<template>
  <div class="profile-card">
    <h1>my profile</h1>
    <div class="buttons">
      <button v-if="editing === true" @click="onSave">save</button>
      <button v-if="editing === true" @click="onCancel">cancel</button>
      <button v-if="editing === false" @click="onEdit">edit</button>
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
        <p>{{ fullName }}</p>
        <p>{{ email }}</p>
      </div>
      <div v-if="editing === true" class="editing-information">
        <input type="text" v-model="newName" :placeholder="fullName" />
        <input type="email" v-model="newEmail" :placeholder="email" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile-card {
    background-color: rgba(255, 255, 255, 0.31);
    width: 80%;
    margin: 0 10%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8rem;
    edit-button {
      background-color: transparent;
    }
    h1 {
      text-transform: uppercase;
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
      .upload-buttons {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 15%;
      }
    }
    img {
      width: 15rem;
      height: 15rem;
      margin: 2rem;
      border-radius: 7.5rem;
    }
    .card-body {
      margin-top: 7.5rem;
      .saved-information {
        gap: 10px;
        flex-direction: column;
        p {
          height: 20px;
          margin: 1px 0 1px 0;
          padding: 0;
          font-size: 1rem;
          padding-left: 5px;
        }
      }
      .editing-information {
        display: flex;
        flex-direction: column;
        input {
          height: 20px;
          font-size: 1rem;
          padding-left: 5px;
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

  const storage = getStorage()

  export default {
    data() {
      return {
        editing: false,
        fullName: '',
        email: '',
        userName: '',
        uploading: false,
        newPhoto: null,
        newName: '',
        newEmail: '',
        url: '/assets/Frame 112.png',
        file: null
      }
    },
    mounted() {
      if (this.$store.state.loggedInUser === null) {
        this.$router.push('/login')
      } else {
        this.fullName = this.$store.state.loggedInUser.fullName
        this.email = this.$store.state.loggedInUser.email
        this.userName = this.$store.state.loggedInUser.userName
        getDownloadURL(
          ref(storage, `${this.$store.state.loggedInUser.userName}`)
        ).then((url) => {
          this.url = url
          console.log(this.url)
        })
      }
    },
    methods: {
      onEdit() {
        this.editing = true
      },
      onCancel() {
        this.editing = false
        this.uploading = false
        this.clearInputs()
      },
      onSave() {
        this.editing = false
        if (this.newName !== '') {
          this.$store.state.loggedInUser.fullName = this.newName
        }
        if (this.newEmail !== '') {
          this.$store.state.loggedInUser.email = this.newEmail
        }
        this.clearInputs()
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
        this.pictureInfo = [this.userName, this.file]

        const storageRef = ref(
          storage,
          `${this.$store.state.loggedInUser.userName}`
        )

        uploadBytes(storageRef, this.file).then(() => {
          console.log('Uploaded a picture')
        })
      },
      clearInputs() {
        this.newName = ''
        this.newEmail = ''
      }
    }
  }
</script>
