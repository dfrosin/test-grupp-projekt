<script>
  const date = new Date().toLocaleString()
  export default {
    name: 'TimeStamp',
    data: () => ({
      timeChange: 'Changed at ' + date
    }),
    methods: {
      printTimestamp() {}
    }
  }
</script>

<template>
  <div @drag="printTimestamp">
    <span>
      {{ timeChange }}
    </span>
  </div>
</template>
