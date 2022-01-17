<template>
  <div class="startPage">
    <el-row>
      <el-col :span="2">
        <div class="inscription noselect">работяга</div>
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
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
  <arrow-button :func="submitRegistration"></arrow-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCookies } from 'vue3-cookies'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'Registration',
  data() {
    const { cookies } = useCookies()
    return {
      student: {
        surname: cookies.get('userSurname'),
        name: cookies.get('userName'),
        group: cookies.get('userGroup')
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
  mounted(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (this.$store.state.gameFinished) {
      this.$router.push({name: 'ResultReport'})
    }

    window.addEventListener('keydown', this.keyDownListener)
  },
  unmounted(): void {
    window.removeEventListener('keydown', this.keyDownListener)
  },
  methods: {
    keyDownListener(event: any): void {
      if (event.key === 'ArrowRight') {
        this.submitRegistration()
      }
    },
    submitRegistration(): void | false {
      try {
        (this.$refs['registrationForm'] as typeof ElForm).validate((valid: any) => {
          if (valid) {
            if (this.$cookies.get('cookieAccess')) {
              this.$cookies.set('userName', this.student.name)
              this.$cookies.set('userSurname', this.student.surname)
              this.$cookies.set('userGroup', this.student.group)
            }

            this.$store.commit('setIsAuth', true)
            this.$router.push({name: 'EmployeeChoose'})
          } else {
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
@import '@/assets/registration.scss';
</style>