<template>
  <v-container class="side-bar">
    <div class="app-label">
      <v-icon left large>mdi-settings-outline</v-icon><h2>Цифровая<br>платформа <span>i4.0</span></h2>
    </div>
    <hr>
    <ul>
      <li><router-link exact to="/"><v-icon left>mdi-briefcase</v-icon>Рабочие задания</router-link></li>
      <li><router-link to="/a"><v-icon left>mdi-medical-bag</v-icon>Журнал дефектов</router-link></li>
      <li><router-link to="/b"><v-icon left>mdi-briefcase</v-icon>Запросы на работы</router-link></li>
      <li><router-link to="/c"><v-icon left>mdi-medical-bag</v-icon>Отчеты и показатели</router-link></li>
      <li><router-link to="/d"><v-icon left>mdi-briefcase</v-icon>Объекты</router-link></li>
      <li><router-link to="/e"><v-icon left>mdi-medical-bag</v-icon>Оборудование</router-link></li>
      <li><router-link to="/f"><v-icon left>mdi-briefcase</v-icon>Запчасти и МТР</router-link></li>
      <li><router-link to="/g"><v-icon left>mdi-medical-bag</v-icon>Счетчики</router-link></li>
      <li><router-link to="/h"><v-icon left>mdi-briefcase</v-icon>Заявки на закупку</router-link></li>
      <li><router-link to="/j"><v-icon left>mdi-medical-bag</v-icon>Бригады</router-link></li>
      <li><router-link to="/k"><v-icon left>mdi-briefcase</v-icon>Контрагенты</router-link></li>
      <li><router-link to="/l"><v-icon left>mdi-medical-bag</v-icon>Документы</router-link></li>
      <li><router-link to="/m"><v-icon left>mdi-briefcase</v-icon>Справочники</router-link></li>
    </ul>
    <div class="services">
      <router-link class="service" to="/p"><v-icon left>mdi-medical-bag</v-icon>Настройки</router-link>
      <router-link class="service" to="/q"><v-icon left>mdi-briefcase</v-icon>Контакты</router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style>
.side-bar {
  top: 20px;
  margin-top: 20px;
  margin-left: 10px;
  position: sticky;
  align-self: start;
  max-width: 320px;
  min-width: 300px;
  background-color: dimgray;
  border-radius: 8px;
  padding: 20px;
}
.side-bar hr {
  margin: 15px 0;
}
.side-bar .router-link-active {
  color: lightblue !important;
}
.side-bar ul {
  list-style: none;
  padding: 0 !important;
}
.side-bar li:hover {
  background-color: darkgrey;
}
.side-bar a {
  color: white !important;
  text-decoration: none;
}
.app-label {
  line-height: 1;
  display: flex;
}
.app-label span {
  color: darkgoldenrod;
}
.services {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.service {
  padding: 8px;
}
</style>
