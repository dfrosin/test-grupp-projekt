<!--
  1.Skapa en overview för profil med namn, profilbild, kontaktuppgifter osv.
  2.Skapa möjligheten att ändra namn och kontaktuppgifter med inputfält.
  3.Skapa en overview med vilka tasks man har och hur långt det är
  kvar på sprinten.

-->

<template>
  <div class="profile-card">
    <h1>my profile</h1>
    <div class="buttons">
      <button v-if="editing === true" @click="onSave">save</button>
      <button v-if="editing === true" @click="onCancel">cancel</button>
      <button v-if="editing === false" @click="onEdit">edit</button>
    </div>
    <div class="img-container">
      <img :src="url" alt="profile picture" />
      <input
        id="editButton"
        v-if="editing === true"
        type="file"
        @change="previewPhoto"
        accept="image/png, image/jpeg"
      />
      <button v-if="editing === true" type="submit">save</button>
    </div>
    <div class="card-body">
      <div v-if="editing === false" class="saved-information">
        <p>{{ fullName }}</p>
        <p>{{ email }}</p>
      </div>
      <div v-if="editing === true" class="editing-information">
        <input type="text" v-model="fullName" />
        <input type="text" v-model="email" />
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
    }
    img {
      width: 15rem;
      height: 15rem;
      margin: 2rem;
    }
    .card-body {
      margin-top: 7.5rem;
      .saved-information {
        gap: 10px;
        flex-direction: column;
        p {
          height: 20px;
          margin: 0;
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
  export default {
    data() {
      return {
        editing: false,
        fullName: 'Adam Agerling',
        email: 'alltidvakenhehe@gmail.com',
        url: '/assets/Frame 112.png'
      }
    },
    methods: {
      onEdit() {
        this.editing = true
      },
      onCancel() {
        this.editing = false
      },
      onSave() {
        this.editing = false
      },
      previewPhoto(photo) {
        const file = photo.target.files[0]
        this.url = URL.createObjectURL(file)
      }
    }
  }
</script>
