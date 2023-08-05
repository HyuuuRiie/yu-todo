<template>
  <div class="text-subtitle-1 ml-4">
    {{ date }}
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'LiveDateTime',
  data() {
    return {
      date: '' 
    };
  },
  methods: {
    getDate() {
      this.date = DateTime.now().toFormat("MMMM d, y, HH:mm:ss");
      setTimeout(this.getDate, 1000) // trigger the same method after 1 second
    }
  },
  mounted() {
    this.getDate();
  }
}
</script>