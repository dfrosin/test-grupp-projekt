<script>
  import { auth } from '../firebase'

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async onSubmit() {
        const userCred = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )

        if (userCred) {
          await this.$store.dispatch('fetchAndSetLoggedInUser', userCred.user)
          this.$router.push('/profile')
        }
      }
    }
  }
</script>

<template>
  <div id="container">
    <form @submit.prevent="onSubmit">
      <div class="inputs">
        <label>Email</label>
        <input
          placeholder="Email"
          required
          type="email"
          v-model="email"
          class="form-control"
        />
      </div>
      <div class="inputs">
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          required
          v-model="password"
          class="form-control"
        />
      </div>
    </form>
    <button @click="onSubmit" type="submit" class="btn btn-success mt-3">
      Log In
    </button>

    <p>Don`t you have an account?</p>
    <routerLink class="link" to="/createaccount">Create account</routerLink>
  </div>
</template>

<style lang="scss" scoped>
  #container {
    display: flex;
    flex-direction: column;

    p {
      font-size: 1.6rem;
      font-weight: bold;
      margin-top: 4.2rem;
      text-align: center;
      color: white;
    }
    .link {
      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;
      color: white;
    }
  }

  h1 {
    color: #fff;
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
  }
</style>

<!--
  Todo
- Alla fält ska vara obligatoriska - check
- Uppgifterna sparas i backend - check
- Uppgifterna sparas i webstorage - check
- Username syns i navbaren när man är inloggad -check
- google-inlogg?
- styling knappen
- lägg till push router till dashboard - check
- router-link till createaccount
-->
