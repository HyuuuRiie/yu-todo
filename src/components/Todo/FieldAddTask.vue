<template>
  <v-text-field
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
    class="field-add-task pa-3"
    outlined
    placeholder="Add Task"
    append-icon="mdi-plus"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        @click="addTask"
        :disabled="newTaskTitleUnvalid"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'FieldAddTask',
  data() {
    return {
      newTaskTitle: '',
      //
    };
  },
  computed: {
    newTaskTitleUnvalid() {
      // if newTaskTitle is empty, disabled button
      return !this.newTaskTitle
    }
  },
  methods: {
    addTask() {
      if (!this.newTaskTitleUnvalid) {
        this.$store.dispatch('addTask', this.newTaskTitle);
        this.newTaskTitle = '';
      }
    },
  },
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(31, 94, 129, 0.4) 
</style>