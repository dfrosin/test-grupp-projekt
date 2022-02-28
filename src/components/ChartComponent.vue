<template>
  <div>
    <DoughnutChart
      :chart-data="crumbleData"
      :options="options"
      css-classes="chart-container"
    />
  </div>
</template>
<script>
  import 'firebase/compat/firestore'
  import { computed, defineComponent, ref, reactive, onMounted } from 'vue'
  import { db } from '../firebase.js'
  import { DoughnutChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  import { collection, getDocs } from 'firebase/firestore'

  Chart.register(...registerables)

  export default defineComponent({
    components: { DoughnutChart },
    setup() {
      const searchQuery = ref('')
      let resArr = reactive([])
      let resArrTwo = reactive([])
      const searchedDocuments = computed(() => {
        return resArr.filter((data) => {
          return (
            data.value.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !=
            -1
          )
        })
      })

      onMounted(() => {
        {
          const colRef = collection(db, 'Adamstest')
          getDocs(colRef).then((x) => {
            x.docs.forEach((doc) => {
              resArr.push({ ...doc.data(), id: doc.id })
            })
            resArrTwo.push(resArr[0].value)

            console.log('Result of resArr2:', resArrTwo)
            console.log('Result of resArr:', resArr[0].value)
          })
        }
      })
      const options = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Crumble Data'
          }
        }
      })
      const crumbleData = {
        labels: ['Vilken data ska vi skriva ut?'],
        datasets: [
          {
            data: [resArr],
            backgroundColor: ['springgreen', 'yellow', 'orange', 'hotpink']
          }
        ]
      }

      return {
        resArr,
        crumbleData,
        options,
        searchedDocuments,
        searchQuery,
        resArrTwo
      }
    }
  })
</script>
