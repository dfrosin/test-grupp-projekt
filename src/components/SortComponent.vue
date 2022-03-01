<script>
  // import firebase from 'firebase/compat/app'
  import 'firebase/compat/firestore'
  import { db } from '../firebase.js'
  import { collection, getDocs } from 'firebase/firestore'
  import { computed, onMounted, reactive, ref } from 'vue'
  // import FilterComponent from './FilterComponent.vue'
  // import PostComponent from './PostComponent.vue'

  export default {
    setup() {
      // const products = reactive([])
      const searchQuery = ref('')
      let test = reactive([])
      const searchedProducts = computed(() => {
        return test.filter((tests) => {
          return (
            tests.value
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1
          )
        })
      })
      onMounted(async () => {
        try {
          const colRef = collection(db, 'Adamstest')

          getDocs(colRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              test.push({ ...doc.data(), id: doc.id })
            })
          })

          console.log('kalle anka', test)
        } catch (e) {
          console.log('Error Loading Products')
        }
      })
      return { searchedProducts, searchQuery }
    }
  }
</script>

<template lang="">
  <div class="filter-Container">
    <div class="ui cards" style="margin: 10px">
      <div class="ui icon input" style="width: 100%">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
        <i class="search icon" />
      </div>
      <div
        class="filter-post"
        v-for="result in searchedProducts"
        :key="result.id"
      >
        <!-- <PostComponent /> -->
        {{ result.value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cards {
    width: 25%;
  }
  .Image-right {
    width: inherit;
    height: auto;
  }
  .content {
    display: flex;
    flex-direction: column;

    border: solid black 2px;
  }
</style>
