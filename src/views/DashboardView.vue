-- to do list: 1- input fält 2- (nice to have , eventhandle för olika event) 3-
v-for sökresultatet 4- props 5- nån slags funktion som kollar vad som är skrivet
i textfältet och filtrerar på boardet 6-

<template>
  <div class="ui cards" style="margin: 10px">
    <div class="ui icon input" style="width: 100%">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
      <i class="search icon" />
    </div>
    <div
      class="card ui fluid"
      v-for="product in searchedProducts"
      :key="product.id"
      style="margin: 0"
    >
      <div class="content">
        <img class="right floated mini ui image" :src="product.imageUrl" />

        <div class="header">{{ product.brand }}</div>
        <div class="meta">
          {{ product.upc }} | {{ product.weight }} Kg |
          {{ product.itemsperpack }} pack
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/compat/app'
  import 'firebase/compat/firestore'
  import { computed, onMounted, reactive, ref } from 'vue'
  export default {
    setup() {
      const products = reactive([])
      const searchQuery = ref('')
      const searchedProducts = computed(() => {
        return products.filter((product) => {
          return (
            product.brand
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1
          )
        })
      })
      onMounted(async () => {
        try {
          const productsSnap = await firebase
            .firestore()
            .collection('products')
            .get()
          productsSnap.forEach((doc) => {
            let product = doc.data()
            product.id = doc.id
            products.push(product)
          })
        } catch (e) {
          console.log('Error Loading Products')
        }
      })
      return { searchedProducts, searchQuery }
    }
  }
</script>
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
