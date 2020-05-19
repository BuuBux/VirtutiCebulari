<template>
  <div class="login-section">
    <form @submit.prevent="login">
      <h2 class="title"> Zaloguj się na swoje konto </h2>
      <p v-if="$v.$anyError" class="warning"> Login lub hasło są zle </p>
      <login-input
        v-model="userInfo.login"
        :title="'Nazwa użytkownika'"
        :name="'login'"
        type="text" />
      <login-input
        v-model="userInfo.password"
        :title="'Hasło'"
        type="password"
        :name="'password'">
      </login-input>
      <button :disabled="$v.$anyError" class="cta-btn-login"> Zaloguj </button>
      <h3 class="register-element">
        Nie masz jeszcze konta? <router-link to="/register">Utwórz</router-link>
      </h3>
    </form>
    <transition-group class="errors" name="erros" tag="div">
      <template v-if="$v.userInfo.login.$error">
        <p :key="1" v-if="!$v.userInfo.login.required"> Login jest wymagany </p>
      </template>
      <template v-if="$v.userInfo.password.$error">
        <p :key="2" v-if="!$v.userInfo.password.required"> Hasło jest wymagane </p>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Validations } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import { UserInfo } from '@/types/Login';
import LoginInput from '@/components/LoginInput.vue';
import { validationMixin } from 'vuelidate';
import NProgress from 'nprogress';

@Component({
  components: {
    LoginInput,
  },
  mixins: [validationMixin],
})
export default class Login extends Vue {
  public userInfo: UserInfo = {
    login: '',
    password: '',
  }

  public freshLogin() {
    return { login: '', password: '' };
  }

  @Validations()
  validations = {
    userInfo: {
      login: { required },
      password: { required },
    },
  }

  public login() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      NProgress.start();
      try {
        console.log('Zalogowano');
      } catch (error) {
        NProgress.done();
        this.userInfo = this.freshLogin();
        throw Error(error);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .login-section {
    background: #2c3e50;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      background: #fff;
      margin: 0 15px;
      border-radius: 8px;
      padding: 35px 15px 15px 15px;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.5);
      .title {
        font: 700 22px/1.35 'Alegreya Sans', sans-serif;
        margin-bottom: 15px;
      }
      .register-element {
        margin-top: 35px;
        font: 400 14px/1.35 'Alegreya Sans', sans-serif;
      }
    }
    .cta-btn-login {
      font: 700 18px/1 'Alegreya Sans', sans-serif;
      border: 2px solid #2c3e50;
      background: transparent;
      padding: 5px 35px;
      margin-top: 10px;
    }
  }
</style>
