<script>
  import { firestore } from '../firebase'
  import firebase from 'firebase/compat/app'
  import { doc, setDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        userName: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
      }
    },
    methods: {
      // --------------- SKAPA NY ANVÄNDARE------------------------------ //
      async createAccount() {
        if (this.password === this.confirmPassword) {
          console.log('Ny användare skapad')
          let userCred = null
          try {
            userCred = await firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
          } catch (error) {
            this.errorMessage = error.message
            console.error(error)
            return
          }
          console.log(userCred) //userCred kommer innehålla uid-värde och token

          const newUser = {
            userName: this.userName,
            email: this.email,
            fullName: this.fullName,
            // password: this.password,
            profilePicture: '/assets/Frame 112.png',
            userId: userCred.user.uid,
            user: 'user'
          }
          const whereToAddData = doc(firestore, `users/${userCred.user.uid}`) //lagrar userobjekt under min uid-nyckel

          setDoc(whereToAddData, newUser)
          this.$store.commit('setLoggedInUser', newUser)
          this.$router.push('/profile')
        } else {
          alert("Passwords doesn't match")
          ;(this.password = ''), (this.confirmPassword = '')
        }
      }
    }
  }
</script>

<template>
  <div id="container">
    <form @submit.prevent="createAccount">
      <div class="inputs">
        <label>Username</label>
        <input
          placeholder="Name"
          v-model="userName"
          class="form-control"
          required
        />
        <div class="inputs">
          <label>Full name</label>
          <input
            placeholder="Full name"
            v-model="fullName"
            class="form-control"
            required
          />
        </div>
        <div class="inputs">
          <label>Email</label>
          <input
            placeholder="Email"
            v-model="email"
            class="form-control"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
            required
          />
        </div>
        <div class="inputs">
          <label>Password</label>
          <input
            placeholder="Password"
            v-model="password"
            class="form-control"
            type="password"
            required
          />
        </div>
        <div class="inputs">
          <label>Confirm password</label>
          <input
            placeholder="Password"
            v-model="confirmPassword"
            class="form-control"
            type="password"
            required
          />
        </div>
        <div id="error">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </form>
    <button @click="createAccount" type="submit" class="btn btn-success mt-3">
      Create account
    </button>
  </div>
</template>

<style lang="scss" scoped>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      color: white;
    }

    #error {
      text-align: center;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    color: black;
    input {
      width: 30%;
      margin: 1rem 35%;
    }
  }
  form {
    label {
      margin-left: 35%;
      color: #fff;
    }
  }

  button {
    width: 10%;
    margin: 0 45%;
    &:hover {
      transform: translateY(-1px);

      &::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
      }
    }

    &:active {
      transform: translateY(-1px);
      box-shadow: 0 5px 10px rgba(#000, 0.404);
    }

    &--white {
      background-color: #cd4c37;
      color: #fff;
      &::after {
        background-color: #559cc5;
      }
    }

    &--green {
      background-color: #008081;
      color: #fff;
      &::after {
        background-color: #008081;
      }
    }

    &::after {
      content: '';
      display: inline-block;
      height: 100%;
      width: 100%;
      border-radius: 3px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transition: all 1s;
    }

    &--animated {
      /* animation: movInBottom 1s ease-out 0.9s; */
      animation-fill-mode: backwards;
    }
  }

  button-text {
    &:link,
    &:visited {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      border-bottom: 1px solid #559cc5;
      padding: 1rem;

      font-size: 1.6rem;
      font-weight: bold;
      background-color: #cd4c37;
      transition: all 0.2s;
    }
    &:hover {
      background-color: #ff7730;
      color: #fff;
      box-shadow: 0 1rem 2rem rgba(#000, 0.25);
    }
    div {
      text-align: center;
    }
  }
</style>

<!--
  Todo
- Alla fält ska vara obligatoriska - check
- Uppgifterna sparas i backend - check
- Uppgifterna sparas i webstorage - check
- Username syns i navbaren när man är inloggad - check
- google-inlogg?
- styling knappen
- lägg till username
- lägg till push router till dashboard
-->
