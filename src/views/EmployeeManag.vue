<template>
  <div class="cards">
    <employee-card
      v-for="employee in employees"
      :employee="employee"
      :key="employee.id"
      :settings="settings"
    />
  </div>
  
</template>

<script>
import { defineComponent } from 'vue'
import EmployeeCard from '@/views/EmployeeCard.vue'
export default defineComponent({
  name: 'EmployeeManagement',
  components: {EmployeeCard},
  data() {
    return {
      employees: [
        {id: 1, position: 'Программист', state: {hp: 30, vision: 95, hearing: 70}, settings: 
          {
            nutritionId: 1, 
            relaxationId: 1, 
            treatmentId: 2
          }
        },
        {id: 2, position: 'Водитель', state: {hp: 89, vision: 50, hearing: 90}, settings: 
          {
            nutritionId: 0, 
            relaxationId: 2, 
            treatmentId: 2
          }
        },
        {id: 3, position: 'Механик', state: {hp: 77, vision: 60, hearing: 99}, settings: 
          {
            nutritionId: 1, 
            relaxationId: 2, 
            treatmentId: 1
          }
        },
        {id: 4, position: 'Токарь', state: {hp: 97, vision: 60, hearing: 25}, settings: 
          {
            nutritionId: 0, 
            relaxationId: 1, 
            treatmentId: 2
          }
        }
      ],
      settings: [
        {
          id: 1,
          title: 'Питание',
          variants: ['на молоке', 'диета', 'мясо', 'голуби']
        },
        {
          id: 2,
          title: 'Отдых',
          variants: ['геншин', 'танки', 'ютуб', 'голуби']
        },
        {
          id: 3,
          title: 'Лечение',
          variants: ['наркоз', 'сон', 'мясо', 'голуби', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз', 'наркоз']
        }
      ]
    }
  }
})
</script>

<style scope lang="scss">
$arrowSize: 70px;

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
      width: 40px;
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