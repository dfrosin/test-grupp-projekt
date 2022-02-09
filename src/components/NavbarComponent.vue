<template lang="">
  <nav>
    <div>logo</div>
    <ul>
      <li><RouterLink to="/">My Projects</RouterLink></li>
      <li><RouterLink to="/about">Create Project</RouterLink></li>
      <li><RouterLink to="/contact">Sign In </RouterLink></li>
      <li><RouterLink to="/contact">Dont have an account?</RouterLink></li>
      <li><RouterLink to="/contact">Adam</RouterLink></li>
      <img src="/assets/Frame 112.png" alt="Adam Agerling" />
    </ul>
  </nav>
</template>
<script>
  export default {}
</script>
<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  div {
    color: #ffffff;
  }
  img {
    height: 37px;
    width: 37px;
    margin-left: 10px;
    margin-top: 2px;
    padding: 0;
    align-items: center;
    justify-content: space-between;
  }
  nav {
    background-color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.1rem 5%;

    ul {
      justify-content: end;
      align-items: center;
      display: flex;
      text-align: right;
      list-style-type: none;
      list-style-type: none;
      margin: 0px;
      padding: 0px;
      li {
        margin: 0;
        padding: 0%;
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        a {
          color: #ffffff;
          text-decoration: none;
          padding: 10px;
          &:hover {
            background-color: rgb(255, 0, 0);
          }
        }
      }
    }
  }
</style>
