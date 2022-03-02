<script>
  import 'firebase/compat/firestore'
  import { computed, defineComponent, ref, reactive, onMounted } from 'vue'
  import { db } from '../firebase.js'
  import { PieChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  import { collection, getDocs } from 'firebase/firestore'

  Chart.register(...registerables)

  export default defineComponent({
    components: { PieChart },
    setup() {
      const message = ref('ADAM ÄR SNYGG')
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
      const fuckingArray = ['shittingArray']
      // const statusArray = statusArray
      // const personalTaskArray = personalTaskArray
      const personalPieChartArray = {
        labels: ['hej'],
        datasets: [
          {
            data: [2, 3],
            backgroundColor: ['springgreen', 'yellow', 'orange', 'hotpink']
          }
        ]
      }
      return {
        resArr,

        options,
        searchedDocuments,
        searchQuery,
        resArrTwo,
        message,
        personalPieChartArray,
        // statusArray,
        // personalTaskArray,
        fuckingArray
      }
    }
  })
</script>
<template>
  <div>
    <PieChart
      :chart-data="crumbleData"
      :options="options"
      css-classes="chart-container"
      :pie-chart-value="personalPieChartArray"
      :task-value="personalTaskArray"
      :status-value="statusArray"
    />
  </div>
</template>
