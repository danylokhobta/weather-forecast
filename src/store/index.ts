import { createStore } from 'vuex';
import settings from './modules/settings';
import fetcher from './modules/fetcher';

export default createStore({
  modules: {
    settings,
    fetcher,
  }
});