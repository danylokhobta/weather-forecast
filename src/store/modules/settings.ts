// settings.ts
import { Module } from 'vuex';

interface SettingsState {
  unitsType: 'metric' | 'imperial';
  dayPhase: 'day' | 'night';
}

const state: SettingsState = {
  unitsType: localStorage.getItem('unitsType') as 'metric' | 'imperial' || 'imperial',
  dayPhase: getCurrentDayPhase(), // Initialize based on the current time
};

// Helper function to determine whether it's day or night
function getCurrentDayPhase(): 'day' | 'night' {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? 'day' : 'night';
}

const getters = {
  getUnitsType(state: SettingsState) {
    return state.unitsType;
  },
  getDayPhase(state: SettingsState) {
    return state.dayPhase;
  },
};

const mutations = {
  setUnitsType(state: SettingsState, unitsType: 'metric' | 'imperial') {
    state.unitsType = unitsType;
    localStorage.setItem('unitsType', unitsType); // Save to localStorage
  },
  setDayPhase(state: SettingsState, dayPhase: 'day' | 'night') {
    state.dayPhase = dayPhase;
  },
  updateDayPhase(state: SettingsState) { 
    state.dayPhase = getCurrentDayPhase();
  },
};

const actions = {
  updateDayPhase({ commit }: { commit: any }) {
    commit('updateDayPhase');
  },
};

const settingsModule: Module<SettingsState, any> = {
  state,
  getters,
  mutations,
  actions,
};

export default settingsModule;
