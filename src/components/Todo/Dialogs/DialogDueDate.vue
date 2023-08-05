<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        @click="saveTask"
        text
        color="primary"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogDueDate',
  props: ['task'],
  data () {
    return {
      date: null // store date from datepicker that has been selected
    };
  },
  methods: {
    saveTask() {
      const payload = {
        id: this.task.id,
        dueDate: this.date
      };
      this.$store.dispatch('updateTaskDueDate', payload)
      this.$emit('close');
    }
  },
  mounted() {
    if (this.task.dueDate) {
      this.date = this.task.dueDate;
    }
  }
};
</script>