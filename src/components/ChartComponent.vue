<script>
  import 'firebase/compat/firestore'
  import { defineComponent, ref } from 'vue'
  import { PieChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'

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
      Chart.defaults.color = 'white'
      function allOrUser() {
        if (chartButton.value === 'User Data') {
          chartButton.value = 'Project Data'
          chartData.value = props.projectValue
        } else {
          chartButton.value = 'User Data'
          chartData.value = props.taskValue
        }
      }
      const chartData = ref(props.taskValue)
      const chartButton = ref('User Data')
      const options = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: chartButton
          }
        }
      })
      const userCrumble = {
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
      const projectCrumble = {
        labels: props.statusValue,
        datasets: [
          {
            data: props.projectValue,
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
        options,
        userCrumble,
        projectCrumble,
        chartData,
        chartButton,
        allOrUser
      }
    }
  })
</script>
<template>
  <input
    type="button"
    @click="allOrUser"
    :value="chartButton"
    class="chart-button"
  />
  <div>
    <PieChart
      v-if="chartButton === 'User Data'"
      :chart-data="userCrumble"
      :options="options"
      css-classes="chart-container"
    />
    <PieChart
      v-if="chartButton === 'Project Data'"
      :chart-data="projectCrumble"
      :options="options"
      css-classes="chart-container"
    />
  </div>
</template>
<style lang="scss" scoped>
  .chart-button {
    width: 15%;
    height: 30px;
    border-radius: 7px;
  }
</style>
