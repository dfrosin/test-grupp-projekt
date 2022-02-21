<template>
  <div class="form-container">
    <form class="firebasetest">
      <Label for="title">Title:</Label>
      <input type="Title" name="title" v-model="title" reguired />
      <label for="author">Author</label>
      <input type="text" name="author" v-model="author" reguired />
      <button>add new book</button>
    </form>
    <form class="delete">
      <input type="text" name="id" reguired />
      <button>delete a book</button>
    </form>
  </div>
</template>

<script>
  export default {
    el: 'firebaseTestComponent',
    data() {
      return {
        title: '',
        author: ''
      }
    },
    methods: {
      addBook() {
        addCoc()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 0.5em;
  }
  .firebasetest {
    display: flex;
    flex-direction: column;
  }

  button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 6px 7px;
    border-radius: 3px;
    box-shadow: 1;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    width: 20%;
    margin-top: 0.5rem;

    align-self: flex-end;
  }
  .delete {
    display: flex;
    flex-direction: column;
  }
</style>
