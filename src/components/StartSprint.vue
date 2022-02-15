<template>
  <label for="start">Start Date</label>
  <input type="date" id="start" v-model="date" />
  <label for="duration">Duration</label>
  <select @change="whatDate" v-model="selectedObject" id="duration">
    <option>1 week</option>
    <option>2 weeks</option>
    <option>3 weeks</option>
    <option>4 weeks</option>
  </select>
  <label for="end">End date</label>
  <input type="date" id="end" />
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
      },
      visible() {
        this.weeks = true
      },
      whatDate() {
        let numberOfWeeks = this.selectedObject.match(/\d+/g)
        let addDays = numberOfWeeks[0] * 7
        let newDate = new Date(this.date + ' ' + '12:00:00')
        newDate.setDate(newDate.getDate() + addDays)

        let day = newDate.getDate().toString().padStart(2, '0')
        let month = newDate.getMonth().toString().padStart(2, '0')
        let year = newDate.getFullYear()

        console.log('Detta är dag: ' + day)
        console.log('Detta är månad: ' + month)
        console.log('Detta är år: ' + year)
      }
    },
    computed: {
      calculateDate() {
        let onlyNumber = this.selectedObject.match(/\d+/g)
        return onlyNumber[0] * 7
      },
      // setDate() {
      //   // let Day = newdate.getDate().toString().padStart(2, '0')
      //   // let Month = newdate.getMonth().toString().padStart(2, '0')
      //   // let Year = newdate.getFullYear()
      //   // 6.048e+8 * 1
      //   // 6.048e+8 * 2
      //   // let plusWeeks = Year + '-' + Month + '-' + Day
      // },
      milliSeconds() {
        let test = this.date + ' ' + '12:00:00'
        return test
      }
    }
  }
</script>

<style lang="scss" scoped></style>
