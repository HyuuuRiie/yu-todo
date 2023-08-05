import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [],
    search: null,
    snackbar: {
      show: false,
      text: '',
    },
    sorting: false,
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      const task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      const task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      // prevent duplicate if a snackbar its already being shown
      if (state.snackbar.show) {
        state.snackbar.show = false; // hide snackbar
        timeout = 300;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      if (newTaskTitle === '') return;
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      // wait to create collection in IndexDB to commit mutations
      db.collection('tasks')
        .add(newTask)
        .then(() => {
          commit('addTask', newTask);
          commit('showSnackbar', 'Task added!');
        });
    },
    doneTask({ state, commit }, id) {
      const task = state.tasks.filter((task) => task.id === id)[0];
      db.collection('tasks')
        .doc({ id: id })
        .update({
          done: !task.done,
        })
        .then(() => {
          commit('doneTask', id);
        });
    },
    deleteTask({ commit }, taskID) {
      db.collection('tasks')
        .doc({ id: taskID })
        .delete()
        .then(() => {
          commit('deleteTask', taskID);
          commit('showSnackbar', 'Task deleted!');
        });
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks')
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit('updateTaskTitle', payload);
          commit('showSnackbar', 'Task updated!');
        });
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks')
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit('updateTaskDueDate', payload);
          commit('showSnackbar', 'Due date updated!');
        });
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks);
      commit('setTasks', tasks);
    },
    getTasks({ commit }) {
      db.collection('tasks')
        .get()
        .then((tasks) => {
          commit('setTasks', tasks);
        });
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) return state.tasks;
      /* filtering where text on the search includes one specific character from title's name;
        which essentially mean its filtering out the titles that dont have what was typed */
      return state.tasks.filter(
        (task) => task.title.toLowerCase().includes(state.search.toLowerCase()) // filter case insensitve
      );
    },
  },
});
