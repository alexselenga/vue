<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="tasks">
      <task-form :title="formTitle" :task="curTask" :statuses="statuses" :priors="priors" @onClose="taskCommit($event)"/>
      <div class="tasks-nav">
        <h1 class="tasks-label">Рабочие задания</h1>
        <div class="tasks-info">
          <v-badge class="task-info" overlap>
            <template v-slot:badge>1</template>
            <v-icon large>mdi-bell-ring-outline</v-icon>
          </v-badge>
          <v-icon class="tasks-info" large>mdi-account-circle</v-icon>
        </div>
      </div>
      <hr>

      <div class="tasks-nav">
        <div class="tasks-views">
          <v-icon large :class="{'tasks-view-active': tasksViewMode == 'list'}" @click="tasksViewMode = 'list'">mdi-view-list</v-icon>
          <v-icon large :class="{'tasks-view-active': tasksViewMode == 'hierarchy'}" @click="tasksViewMode = 'hierarchy'">mdi-vanity-light</v-icon>
          <v-icon large :class="{'tasks-view-active': tasksViewMode == 'period'}" @click="tasksViewMode = 'period'">mdi-calendar-month</v-icon>
        </div>
        <v-text-field class="task-search" outlined dense hide-details label="Поиск..." prepend-inner-icon="mdi-magnify"></v-text-field>
        <div class="task-found-label">Найдено {{tasks.length}} рабочих заданий</div>
        <v-btn class="new-task" @click="taskCreate"><v-icon left >mdi-plus-circle-outline</v-icon>Новое<br>рабочее задание</v-btn>
      </div>
      <hr>

      <div class="tasks-nav">
        <v-btn><v-icon left>mdi-filter-variant</v-icon>Дополнительные<br>фильтры</v-btn>
        <v-btn><v-icon left>mdi-worker</v-icon>Ремонтный<br>персонал</v-btn>
        <v-btn><v-icon left>mdi-home-flood</v-icon>Объекты<br>обслуживания</v-btn>
        <v-btn><v-icon left>mdi-calendar-range</v-icon>Дата и срок<br>обслуживания</v-btn>
        <v-btn><v-icon left>mdi-home-group</v-icon>Статус<br>рабочего задания</v-btn>
        <v-btn><v-icon left>mdi-priority-high</v-icon>Приоритет<br>выполнения</v-btn>
      </div>

      <div class="table-header">
        <div class="table-cell">Срок<br>завершения</div>
        <div class="table-cell">Номер<br>задания</div>
        <div class="table-cell">Статус<br>задания</div>
        <div class="table-cell">Наименование работ</div>
        <div class="table-cell">Приоритет</div>
        <div class="table-cell">Бригада /<br>исполнитель</div>
        <div class="table-cell">Объект</div>
        <div class="table-cell">
        </div>
      </div>

      <div class="table-data">
        <div
            class="table-row"
            v-for="task in tasks"
            :key="task.id"
            :setPrior="prior = priors.find((p) => p.priorId == task.priorId) || priors[0]"
            :setStatus="status = statuses.find((s) => s.statusId == task.statusId) || statuses[0]"
            @click="taskUpdate(task, $event)"
        >
          <div class="table-cell">{{task.date}}</div>
          <div class="table-cell">{{task.taskNum}}</div>
          <div class="table-cell" :class="{'status-3': status.statusId == 3}"><v-icon left small :color="status.color">{{status.icon}}</v-icon>{{status.label}}</div>
          <div class="table-cell">{{task.name}}</div>
          <div class="table-cell cell-center"><v-btn small :color="prior.color">{{prior.label}}</v-btn></div>
          <div class="table-cell">{{task.executor}}</div>
          <div class="table-cell">{{task.objName}}</div>
          <div class="table-cell">
            <div class="row-control" @click="taskUpdate(task)"><v-icon small>mdi-card-search</v-icon></div>
            <div class="row-control" @click="taskUpdate(task)"><v-icon small>mdi-pencil</v-icon></div>
            <div class="row-control" @click="taskDelete(task)"><v-icon small>mdi-delete</v-icon></div>
          </div>
        </div>
      </div>
    </v-container>
</template>

<script>
import TaskForm from './TaskForm'

export default {
  name: 'Tasks',
  components: { TaskForm },
  data: () => ({
    tasks: [
      { id: 1, date: '05.10.2019', taskNum: '00007', statusId: 2, name: 'Течь трубы в здании - устранить', priorId: 1, executor: 'Бригада номер 1', objName: 'Здание номер 1' },
      { id: 2, date: '06.10.2019', taskNum: '00009', statusId: 1, name: 'Вибрация мотора', priorId: 2, executor: 'Бригада номер 2', objName: 'Здание номер 2' },
      { id: 3, date: '31.12.2019', taskNum: '00011', statusId: 3, name: 'Дырка в трубе - устранить', priorId: 3, executor: 'Бригада номер 1', objName: 'Здание номер 1' },
      { id: 4, date: '08.13.2019', taskNum: '00012', statusId: 1, name: 'Река засохла - наполнить водой', priorId: 1, executor: 'Бригада номер 1', objName: 'Волга' },
      { id: 5, date: '32.12.2019', taskNum: '00014', statusId: 3, name: 'Дом упал', priorId: 2, executor: 'Бригада номер 1', objName: 'Москва-Сити' },
      { id: 6, date: '05.11.2019', taskNum: '00015', statusId: 2, name: 'Столб на дороге - убрать', priorId: 1, executor: 'Бригада номер 1', objName: 'Шоссе' },
      { id: 7, date: '06.11.2019', taskNum: '00016', statusId: 1, name: 'Яма на дороге - засыпать', priorId: 2, executor: 'Бригада номер 2', objName: 'Шоссе' },
      { id: 8, date: '31.12.2019', taskNum: '00017', statusId: 3, name: 'Забор косой - выпрямить', priorId: 3, executor: 'Бригада номер 1', objName: 'Здание номер 3' },
      { id: 9, date: '06.12.2019', taskNum: '00018', statusId: 1, name: 'Дерево упало - поднять', priorId: 1, executor: 'Бригада номер 1', objName: 'Здание номер 4' },
      { id: 10, date: '08.13.2019', taskNum: '00019', statusId: 2, name: 'Нет асфальта', priorId: 2, executor: 'Бригада номер 1', objName: 'Шоссе' }
    ],
    statuses: [
      { statusId: 0, label: 'Не определен', color: 'red darken-4', icon: 'mdi-alert-outline' },
      { statusId: 1, label: 'В работе', color: 'orange lighten-1', icon: 'mdi-worker' },
      { statusId: 2, label: 'Выполнено', color: 'green lighten-1', icon: 'mdi-check-outline' },
      { statusId: 3, label: 'Просрочено', color: 'red lighten-1', icon: 'mdi-alarm-light' }
    ],
    priors: [
      { priorId: 0, label: 'Не определен', color: 'red darken-4' },
      { priorId: 1, label: 'Высший', color: 'red lighten-1' },
      { priorId: 2, label: 'Средний', color: 'orange lighten-1' },
      { priorId: 3, label: 'Низкий', color: 'lime lighten-1' }
    ],
    tasksViewMode: 'list',
    formTitle: '',
    curTask: {}
  }),
  methods: {
    taskCreate () {
      this.curTask = {
        statusId: 0,
        priorId: 0
      }

      this.formTitle = 'Новое задание'
    },
    taskUpdate (task, event = null) {
      if (event && (event.target.className.includes('v-btn') || event.target.className.includes('v-icon'))) return
      this.curTask = Object.assign({}, task)
      this.formTitle = 'Редактирование задания'
    },
    taskCommit (task) {
      this.formTitle = ''
      if (!task) return

      if (task.id) {
        let taskIndex = this.getTaskIndex(task.id)
        this.tasks[taskIndex] = task
      } else {
        let maxId = 0
        this.tasks.forEach(_task => { maxId = Math.max(maxId, _task.id) })
        task.id = maxId + 1
        this.tasks.push(task)
      }
    },
    taskDelete (task) {
      let taskIndex = this.getTaskIndex(task.id)
      this.tasks.splice(taskIndex, 1)
    },
    getTaskIndex (id) {
      return this.tasks.findIndex(task => task.id === id)
    }
  }
}
</script>

<style>
  .tasks hr {
    border-top: 1px solid lightgray;
  }
  .tasks-nav {
    padding: 10px 20px;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tasks-nav .v-btn {
    font-size: 0.65rem !important;
  }
  .tasks-label {
    flex-basis: auto;
  }
  .tasks-info {
    flex-basis: content;
  }
  .tasks-info {
    padding-left: 20px;
  }
  .tasks-views {
    flex-basis: content;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
  }
  .tasks-view-active {
    background-color: lightblue;
    border-radius: 4px;
  }
  .task-search {
    flex-basis: 40%;
    border-radius: 12px !important;
  }
  .task-found-label {
    flex-basis: 60%;
    padding: 10px;
    color: gray;
  }
  .new-task {
    flex-basis: content;
    background-color: lightcoral !important;
    padding: 7px 12px !important;
    border-radius: 12px !important;
  }
  .table-header {
    height: 50px;
    background-color: #E5E5E5;
    margin-top: 5px;
    padding: 6px 0;
    position: sticky;
    top: 4px;
    outline: 4px solid white;
    z-index: 1;
    display: flex;
  }
  .table-data {
    overflow-scrolling: auto;
  }
  .table-row {
    height: 90px;
    background-color: #F0F0F0;
    padding: 6px 0;
    margin: 10px 0;
    border-radius: 8px;
    display: flex;
  }
  .table-row:hover {
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);
  }
  .table-cell {
    width: 200px;
    font-size: 0.9rem;
    align-items: center;
    padding: 6px;
    overflow: hidden;
    display: flex;
  }
  .cell-center {
    justify-content: center;
  }
  .table-header .table-cell {
    font-size: 0.8rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }
  .table-cell:last-child {
    border-left: 1px solid #D0D0D0;
  }
  .table-header .table-cell:not(:first-child) {
    border-left: 1px solid #D0D0D0;
  }
  .table-cell:nth-child(1) {
    width: 9%;
  }
  .table-cell:nth-child(2) {
    width: 8%;
  }
  .table-cell:nth-child(3) {
    width: 14%;
  }
  .table-cell:nth-child(4) {
    width: 26%;
  }
  .table-cell:nth-child(5) {
    width: 10%;
  }
  .table-cell:nth-child(6) {
    width: 14%;
  }
  .table-cell:nth-child(7) {
    width: 14%;
  }
  .table-cell:nth-child(8) {
    width: 5%;
    flex-direction: column;
    justify-content: center;
  }
  .row-control {
    padding: 2px;
  }
  .row-control:hover {
    background-color: lightblue;
    border-radius: 4px;
  }
  .tasks .v-btn {
    text-transform: none !important;
  }
  .status-3 {
    font-weight: bold;
  }
</style>
