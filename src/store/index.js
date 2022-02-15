/* import { createStore } from 'vuex'
import { db, fs } from '../firebase'
export default createStore({
  state: {
    products: [
      {
        id: 1,
        name: 'Product 1',
        price: 1,
        url: 'https://images.pexels.com/photos/59945/strawberry-fruit-delicious-red-59945.jpeg',
        cart: false,
        quantity: 1
      },
      {
        id: 2,
        name: 'Product 2',
        price: 2,
        url: 'https://images.pexels.com/photos/52533/orange-fruit-vitamins-healthy-eating-52533.jpeg',
        cart: false,
        quantity: 1
      },
      {
        id: 3,
        name: 'Product 3',
        price: 3,
        url: 'https://images.pexels.com/photos/51312/kiwi-fruit-vitamins-healthy-eating-51312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        cart: false,
        quantity: 1
      }
    ],
    cart: []
  },
  mutations: {
    addProduct(state, product) {
      state.products.map((p) => {
        if (p.id == product.id) {
          p.cart = true
        }
      })
    },
    removeProduct(state, id) {
      state.products.map((p) => {
        if (p.id == id) {
          p.cart = false
        }
      })
    },
    addAllProducts(state, products) {
      state.cart.push(products)
    },
    cleanStore(state) {
      state.cart = []
    }
  },
  actions: {
    async addProduct({ commit }, product) {
      console.log(product)
      commit('addProduct', product)
      await db
        .collection('cart')
        .doc(`${product.id}`)
        .set(product, { merge: true })
    },
    addAllProducts({ commit }, product) {
      commit('addAllProducts', product)
    },
    removeProduct({ commit }, id) {
      commit('removeProduct', id)
      db.collection('cart').doc(`${id}`).delete()
    },
    increase({ commit }, id) {
      db.collection('cart')
        .doc(`${id}`)
        .update('quantity', fs.firestore.FieldValue.increment(1))
    },
    decrease({ commit }, id) {
      db.collection('cart')
        .doc(`${id}`)
        .update('quantity', fs.firestore.FieldValue.increment(-1))
    },
    cleanStore({ commit }) {
      commit('cleanStore')
    }
  },
  getters: {
    getProducts: (state) => {
      return state.products
    },
    getCart: (state) => {
      return state.cart
    },
    getTotal: (state) => {
      let total = 0
      state.cart.map((p) => {
        total += p.price * p.quantity
      })
      return total
    }
  },
  modules: {}
})
 */
