<template>
  <div class="startPage">
    <el-row>
      <el-col :span="2">
        <div class="inscription">РАБОТЯГА</div>
      </el-col>
      <el-col :span="22">
        <div class="registration">
          <el-form 
            ref="registrationForm"
            class="registration__form" 
            label-width="85px" 
            label-position="left"
            :rules="rules"
            :model="student"
          >
            <el-form-item label="Фамiлiя" prop="surname">
              <el-input 
                v-model="student.surname" 
                type="text" 
                placeholder="Гейзенберг" 
                clearable
                maxlength="30"
                show-word-limit
                class="mt0"
              />
            </el-form-item>
            <el-form-item label="Iм'я" prop="name">
              <el-input 
                v-model="student.name" 
                type="text" 
                placeholder="Карл" 
                clearable 
                maxlength="30"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="Група" prop="group">
              <el-input 
                v-model="student.group" 
                type="text" 
                placeholder="ПЗПI-21-6" 
                clearable
                maxlength="20"
                show-word-limit
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="submitRegistration" plain>Обрати локацiю</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'Registration',
  components: {},
  data() {
    return {
      student: {
        surname: '',
        name: '',
        group: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Будь ласка, ведіть Вашу фамілію',
            trigger: 'blur'
          }
        ],
        surname: [
          {
            required: true,
            message: 'Будь ласка, ведіть Ваше ім\'я',
            trigger: 'blur'
          }
        ],
        group: [
          {
            required: true,
            message: 'Будь ласка, ведіть Вашу групу',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitRegistration() {
      try {
        (this.$refs['registrationForm'] as typeof ElForm).validate((valid: any) => {
          if (valid) {
            console.log('it`s valid')
          } else {
            console.log('it`s not valid')
            return false
          }
        })
      } catch (error) {
        console.log(error)
      } 
    }
  }
});
</script>

<style lang="scss" scope>
.inscription {
  font-size: 3.75em;
  max-width: 1em;
  text-align: center;
  word-wrap: break-word;
}
.registration {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.registration__form {
  .el-input {
    min-width: 400px;
  }
  label {
    color: #f7f7f7;
    font-size: 1.2em;
    margin-right: 25px;
  }
  &:last-child div {
    display: flex;
    justify-content: flex-end;
    button {
      font-size: 1.2em;
    }
  }
  .el-input__inner {
    font-size: 1.3em;
  }
}
</style>