<script>
  import 'firebase/compat/firestore'
  import { computed, defineComponent, ref, reactive, onMounted } from 'vue'
  import { db } from '../firebase.js'
  import { PieChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  import { collection, getDocs } from 'firebase/firestore'

  Chart.register(...registerables)

  export default defineComponent({
    props: {
      taskValue: {
        type: String,
        default: ''
      },
      statusValue: {
        type: [Array],
        default: null
      },
      projectValue: {
        type: String,
        default: ''
      }
    },
    components: { PieChart },
    setup(props) {
      const message = ref('ADAM ÄR SNYGG')
      const searchQuery = ref('')
      Chart.defaults.color = 'white'
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
      console.log(props.taskValue)
      console.log(props.statusValue)

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
      // const statusArray = statusArray
      // const personalTaskArray = personalTaskArray
      const crumbleData = {
        labels: props.statusValue,
        datasets: [
          {
            data: props.taskValue,
            backgroundColor: [
              'rgb(255, 107, 107)',
              'rgb(255, 242, 124)',
              'rgb(6, 170, 221)',
              'rgb(48, 214, 174)',
              'rgb(255, 204, 129)',
              'rgb(255, 91, 219)',
              'rgb(161, 40, 181)',
              'rgb(172, 255, 190)',
              'rgb(152, 143, 255)'
            ]
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
        crumbleData
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
    />
  </div>
</template>
