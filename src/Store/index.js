import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const timerStates = {
  brklength: 5,
  sesslength: 25,
  timerState: "stopped",
  timerType: "Session",
  timer: 1500,
};

const timerSlice = createSlice({
  name: "timers",
  initialState: timerStates,
  reducers: {
    increbreak(state) {
      if (state.brklength === 60) return;
      if (state.timerState === "stopped") {
        state.brklength++;
        if (state.timerType === "Break") {
          state.timer = state.brklength * 60;
        }
      }
    },
    decrebreak(state) {
      if (state.brklength === 1) return;
      if (state.timerState === "stopped") {
        state.brklength--;
        if (state.timerType === "Break") {
          state.timer = state.brklength * 60;
        }
      }
    },
    incretsession(state) {
      if (state.sesslength === 60) return;
      if (state.timerState === "stopped") {
        state.sesslength++;
        if (state.timerType === "Session") {
          state.timer = state.sesslength * 60;
          console.log(state.timer);
        }
      }
    },
    decresession(state) {
      if (state.sesslength === 1) return;
      if (state.timerState === "stopped") {
        state.sesslength--;
        if (state.timerType === "Session") {
          state.timer = state.sesslength * 60;
        }
      }
    },
    setTimer(state) {
      if (state.timerState === "stopped") return;
      if (state.timer === 0 && state.timerType === "Session") {
        state.timerType = "Break";
        state.timer = state.brklength * 60;
        document.getElementById("beep").play();
      }
      if (state.timer === 0 && state.timerType === "Break") {
        state.timerType = "Session";
        state.timer = state.sesslength * 60;
        document.getElementById("beep").play();
      }
      state.timer--;
    },
    setTimerState(state, action) {
      state.timerState = action.payload;
    },
    setInitialState(state) {
      state.brklength = 5;
      state.sesslength = 25;
      state.timerState = "stopped";
      state.timerType = "Session";
      state.timer = 1500;
    },
  },
});

export const timerActions = timerSlice.actions;

const store = configureStore({
  reducer: { timer: timerSlice.reducer },
});

export default store;
