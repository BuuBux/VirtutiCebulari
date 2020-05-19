import { VuexModule, Module } from 'vuex-module-decorators';
import { LoginState } from '@/types/StoreTypes';
import store from '@/store';

@Module({ dynamic: true, store, name: 'login' })
class Login extends VuexModule implements LoginState {

}
