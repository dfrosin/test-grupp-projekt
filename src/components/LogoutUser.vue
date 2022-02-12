<template>
  <button @click="handleLogout" type="submit" class="btn btn-success mt-3">
    Log out
  </button>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleLogout() {
        this.$store.commit('setLoggedInUser', null)
        this.$router.push('/login')
        console.log(this.$store.state.loggedInUser)
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
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
      //border-radius: 2px;
      font-size: 1.6rem;
      font-weight: bold;
      background-color: #cd4c37;
      transition: all 0.2s;
    }
    &:hover {
      background-color: #ff7730;
      color: #fff;
      box-shadow: 0 1rem 2rem rgba(#000, 0.25);
      /* transform: translateY(-5px); */
      /* padding: 1rem; */
      /* border: solid 2px $color-primary-chocolate; */
      /* border-bottom: solid 2px $color-primary-chocolate; */
    }
  }
</style>

<!--
  Todo
  När man trycker på knappen ska user loggas ut
  Lägg till push router till login
  lägg till styling för knappen
  -->
