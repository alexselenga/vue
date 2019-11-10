<template>
  <v-dialog v-model="dialog" scrollable width="600px">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>
        <v-text-field label="Наименование работ*" v-model="task.name"></v-text-field>
        <v-text-field label="Срок завершения" v-model="task.date"></v-text-field>
        <v-select label="Статус задания" v-model="task.statusId" :items="statuses" item-text="label" item-value="statusId"></v-select>
        <v-select label="Приоритет" v-model="task.priorId" :items="priors" item-text="label" item-value="priorId"></v-select>
        <v-text-field label="Бригада / исполнитель" v-model="task.executor"></v-text-field>
        <v-text-field label="Объект" v-model="task.objName"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">Отмена</v-btn>
        <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TaskForm',
  props: ['title', 'task', 'statuses', 'priors'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    cancel () {
      this.close(null)
    },
    save () {
      this.close(this.task)
    },
    close (task) {
      this.$emit('onClose', task)
    }
  },
  watch: {
    title (val) {
      this.dialog = val
    },
    dialog (val) {
      !val && this.close()
    }
  }
}
</script>

<style>
.v-dialog__content {
  justify-content: right !important;
}
</style>
