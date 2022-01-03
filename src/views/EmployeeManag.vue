<template>
  <div class="cards">
    <employee-card
      v-for="employee in employees"
      :employee="employee"
      :key="employee.id"
      :settings="settings"
      @setSetting="setSetting"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import EmployeeCard from '@/views/EmployeeCard.vue'
export default defineComponent({
  name: 'EmployeeManagement',
  components: {EmployeeCard},
  methods: {
    setSetting(setting) {
      Object.assign(this.employees[setting[0] - 1].settings, setting[1])
    }
  },
  data() {
    return {
      employees: [
        {id: 1, position: 'Программист', 
          state: {hp: 100, vision: 100, hearing: 100}, 
          settings: {},
          optionalSettings: {}
        },
        {id: 2, position: 'Водитель', 
          state: {hp: 100, vision: 100, hearing: 100}, 
          settings: {},
          optionalSettings: {}
        },
        {id: 3, position: 'Механик', 
          state: {hp: 100, vision: 100, hearing: 100}, 
          settings: {},
          optionalSettings: {}
        },
        {id: 4, position: 'Токарь', 
          state: {hp: 100, vision: 100, hearing: 100}, 
          settings: {},
          optionalSettings: {}
        }
      ],
      settings: [
        {
          id: 1,
          title: 'Питание',
          translation: 'nutrition',
          variants: ['на молоке', 'диета', 'мясо', 'голуби']
        },
        {
          id: 2,
          title: 'Отдых',
          translation: 'relaxation',
          variants: ['геншин', 'танки', 'ютуб', 'голуби']
        },
        {
          id: 3,
          title: 'Лечение',
          translation: 'treatment',
          variants: ['наркоз', 'сон', 'мясо', 'голуби']
        }
      ]
    }
  }
})
</script>

<style scope lang="scss">
$arrowSize: 3em;

.cards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.right {
  width: 5%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  img {
    width: $arrowSize;
    position: fixed;
    top: calc(50% - $arrowSize/2);
  }
  &__year-counter {
    position: fixed;
    top: calc(50% + $arrowSize/2);
    font-size: 1.3em;
    background-color: black;
    padding: 0px 5px;
    font-weight: bold;
    border-radius: 5px;
  }
}
.left {
  width: 5%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: fixed;
  .repeat, .reference {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 2em;
      position: fixed;
    }
  }
}
.right, .repeat, .reference {
  transition: all 0.1s ease-in-out;
}
.repeat:hover, .reference:hover {
  background-color: darken(#C1A6A6, 10);
  transform: scale(1.05);
}
.right:hover {
  background-color: darken(#C1A6A6, 10);
}

.el-drawer {
  background-color: #dbcbcc !important;
  color: black;
  &__header span {
    color: black;
  }
  &__close-btn {
    transition: all 0.1s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>