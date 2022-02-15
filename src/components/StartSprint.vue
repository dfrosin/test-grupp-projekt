<template>
  <label for="start">Start Date</label>
  <input type="date" id="start" v-model="date" />
  <label for="duration">Duration</label>
  <select v-model="selectedObject" id="duration">
    <option>1 week</option>
    <option>2 weeks</option>
    <option>3 weeks</option>
    <option>4 weeks</option>
  </select>
  <label for="end">End date</label>
  <input type="date" id="end" :value="date + 21" />
</template>

<script>
  export default {
    data() {
      return {
        date: '',
        selectedObject: '',
        weeks: false
      }
    },
    methods: {
      getDate() {
        console.log(this.date)
      }
    },
    computed: {
      calculateDate() {
        let onlyNumber = this.selectedObject.match(/\d+/g)
        return onlyNumber[0] * 7
      },
      setDate() {
        var adddays = parseInt(21) // number of days to add or subtract
        var newdate = new Date()
        newdate.setDate(newdate.getDate() + adddays)

        let Day = newdate.getDate()
        let Month = newdate.getMonth() + 1
        let Year = newdate.getFullYear()

        let plusWeeks = Year + '-' + Month + '-' + Day
        return plusWeeks
      }
    }
  }
</script>

<style lang="scss" scoped></style>
