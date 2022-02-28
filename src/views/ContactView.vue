<template>
  <div>
    <h1>Dashboard</h1>

    <div>
      <select>
        <option @click="sortBy('title')">
          <span>By project name</span>
        </option>
        <option @click="sortBy('person')">
          <span>By Person</span>
        </option>
      </select>

      <div v-for="project in projects" :key="project.title">
        <div :class="`${project.status}`">
          <div>
            <div>Project title</div>
            <div>{{ project.title }}</div>
          </div>
          <div>
            <div>Person</div>
            <div>{{ project.person }}</div>
          </div>
          <div>
            <div>Due by</div>
            <div>{{ project.due }}</div>
          </div>
          <div>
            <div>
              <div :class="`${project.status}`">{{ project.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        projects: [
          {
            title: 'hmmm',
            person: 'shmed',
            due: '1st Jan 2344',
            status: 'ongoing',
            content: 'DGFGASOJRDIOADOKGJRIOGJIOERGIFSEOIKOPFKWEF'
          },
          {
            title: 'jag heter adam',
            person: 'kamankesh',
            due: '10th Jan 3434',
            status: 'complete',
            content: 'sdgsdfgdfgdfhdftghwsefsFAWESF'
          },
          {
            title: 'yes',
            person: 'stupid david',
            due: '20th Dec 7576',
            status: 'complete',
            content: 'WESFERTGRGERGERGHTHQWR '
          },
          {
            title: 'mamma',
            person: 'fredrik',
            due: '20th Oct 4444',
            status: 'overdue',
            content: 'asfsdfdafgsdfsWSEFWESFWEF'
          }
        ]
      }
    },
    methods: {
      sortBy(MahdiKamankesh) {
        this.projects.sort((a, b) =>
          a[MahdiKamankesh] < b[MahdiKamankesh] ? -1 : 1
        )
      }
    }
  }
</script>

<style></style>
