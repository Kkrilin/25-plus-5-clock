import { useSelector, useDispatch } from "react-redux";
import { timerActions } from "./Store";
import beep from "./Assets/Beep.wav";

function App() {
  const dispatch = useDispatch();
  const { brklength, sesslength, timer, timerState, timerType } = useSelector(
    (state) => state.timer
  );

  let minute = Math.floor(timer / 60);
  if (minute < 10) {
    minute = "0" + minute;
  }
  let second = timer % 60;
  if (second < 10) {
    second = "0" + second;
  }

  if (timerState === "running") {
    setTimeout(() => {
      dispatch(timerActions.setTimer());
    }, 1000);
  }

  const timerChangeHandler = (e) => {
    switch (e.currentTarget.id) {
      case "break-decrement":
        dispatch(timerActions.decrebreak());
        break;
      case "break-increment":
        dispatch(timerActions.increbreak());
        break;
      case "session-decrement":
        dispatch(timerActions.decresession());
        break;
      case "session-increment":
        dispatch(timerActions.incretsession());
        break;
      default:
        return;
    }
  };

  const stopPauseHandler = (e) => {
    if (e.target.className === "fa fa-play fa-2x") {
      console.log(e.target.className);
      dispatch(timerActions.setTimerState("running"));
    }
    if (e.target.className === "fa fa-pause fa-2x") {
      console.log(e.target.className);
      dispatch(timerActions.setTimerState("stopped"));
    }
  };

  return (
    <div id="container">
      <div className="main-title">25 + 5 clock</div>
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button
          onClick={timerChangeHandler}
          className="btn-level"
          id="break-decrement"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <div id="break-length" className="btn-level">
          {brklength}
        </div>
        <button
          onClick={timerChangeHandler}
          className="btn-level"
          id="break-increment"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button
          onClick={timerChangeHandler}
          className="btn-level"
          id="session-decrement"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <div id="session-length" className="btn-level">
          {sesslength}
        </div>
        <button
          onClick={timerChangeHandler}
          className="btn-level"
          id="session-increment"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{timerType}</div>
          <div id="time-left">
            {minute}:{second}
          </div>
        </div>
      </div>
      <div className="timer-control">
        <button id="start_stop" onClick={stopPauseHandler}>
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button
          id="reset"
          onClick={() => dispatch(timerActions.setInitialState())}
        >
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      <audio id="beep" preload="auto" src={beep}></audio>
    </div>
  );
}

export default App;
