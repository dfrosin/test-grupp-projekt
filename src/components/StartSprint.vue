<script>
  import { firestore } from '../firebase.js'
  import { doc, updateDoc } from 'firebase/firestore'
  export default {
    created() {
      let todaysDate = new Date().getTime()
      let TodaysCalendarDate = new Date(todaysDate)
      let calendarDate = TodaysCalendarDate.toISOString().substr(0, 10)
      this.date = calendarDate
    },
    data() {
      return {
        date: '',
        selectedObject: '',
        clickedDateMillisec: '',
        oneWeekMillisec: '',
        totalMillisec: '',
        endDate: '',
        sprintGoal: '',
        numberOfCases: null
      }
    },
    methods: {
      whatDate() {
        //datumet i millisekunder
        this.clickedDateMillisec = new Date(this.date).getTime()

        //Hämtar nummret i strängen i Options.
        let onlyNumber = this.selectedObject.match(/\d+/g)

        // en vecka i millisekunder
        this.oneWeekMillisec = 1000 * 60 * 60 * 24 * 7

        //Förra datumet plus hur många veckor
        this.oneWeekMillisec = this.oneWeekMillisec * onlyNumber[0]
        this.totalMillisec = this.clickedDateMillisec + this.oneWeekMillisec

        //Får ut objektet som datumformat
        let newDateObject = new Date(this.totalMillisec)
        let calendarDate = newDateObject.toISOString().substr(0, 10)
        this.endDate = calendarDate
      },

      sendSprintGoal() {
        const whereToAddData = doc(
          firestore,
          `projects/${this.$store.state.projectName}`
        )

        const updateData = {
          sprintGoal: this.sprintGoal,
          duration: this.selectedObject,
          sprintStart: this.date,
          sprintEnd: this.endDate
        }
        updateDoc(whereToAddData, updateData)
        this.$store.commit('setSprintGoal', this.sprintGoal)
        this.$router.push('/sprint/')
      }
    },
    computed: {}
  }
</script>
<template>
  <!--På Kanban boardet vill vi kunna se hur lång tid det är kvar för sprinten, men det lägger vi åt sidan för nu!-->
  <div v-if="$store.state.arrayOfTasks" class="template">
    <h2 v-if="$store.state.projectName !== null">
      {{ $store.state.projectName }}
    </h2>
    <h2>
      {{ $store.state.arrayOfTasks.length }} tasks will be added to this Sprint
    </h2>
    <div class="calendar">
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
      <input type="date" :value="this.endDate" />
      <label for="goal">Sprint Goal</label>
      <input
        class="sprint-goal"
        v-model="sprintGoal"
        @keyup.enter="sendSprintGoal"
        id="goal"
      />
      <button
        :disabled="sprintGoal === ''"
        @click="sendSprintGoal"
        type="submit"
        class="btn btn-secondary mt-3"
      >
        Send-sprint
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .template {
    margin-top: 2rem;
    background-color: rgba(245, 245, 245, 0.418);
    display: block;
    width: 85%;
    height: auto;
    margin: auto;
    border: 3px;
    border-color: white;
    border-style: solid;
    border-radius: 10px;

    h2 {
      margin-left: 20px;
    }
  }
  .sprint-goal {
    width: 40rem;
  }
  .calendar {
    font-size: 1.3rem;
    width: 80%;
    height: 80%;
    margin-left: 20px;
  }
  label {
    display: block;
    text-decoration: underline;
    padding: 0.3rem;
  }
  input {
    display: block;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid white;
    cursor: pointer;
    width: 12rem;
    margin-bottom: 1rem;
  }
  select {
    border-radius: 5px;
    width: 7rem;
    height: 2rem;
    margin-bottom: 1rem;
  }
  .btn {
    margin-left: 340px;
    grid-row: 10;
    grid-column: 2;
    margin-bottom: 16px;
  }
</style>
