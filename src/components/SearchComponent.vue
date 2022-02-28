-- to do list: 1- input fält 2- (nice to have , eventhandle för olika event) 3-
v-for sökresultatet 4- props 5- nån slags funktion som kollar vad som är skrivet
i textfältet och filtrerar på boardet 6-

<template>
  <div class="ui icon input" style="width: 100%">
    <input type="text" placeholder="Search..." v-model="searchQuery" />
    <i class="search icon" />
  </div>
  <div
    class="card ui fluid"
    v-for="product in products"
    :key="product.id"
    style="margin: 0"
  >
    <div class="content">
      <img class="right floated mini ui image" :src="product.imageURL" />
      <div class="header">{{ product.title }}</div>
      <div class="meta">
        {{ product.upc }} | {{ product.weight }} Kg |
        {{ product.itemsperpack }} pack
      </div>
    </div>
  </div>
</template>
<script>
  /*import firestore from '../firebase'
  import { collection } from 'firebase/firestore'*/
  import firebase from 'firebase/compat/app'
  import { onMounted, reactive, ref, computed } from 'vue'

  export default {
    setup() {
      const searchQuery = ref('')
      const products = reactive([])
      const searchedProducts = computed(() => {
        return products.value.filter((product) => {
          return (
            product.title
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
            products.push(doc.data())
          })
        } catch (e) {
          console.log('Error Loading Products')
        }
      })
      return { searchedProducts, searchQuery }
    }
  }
</script>
<style lang=""></style>
