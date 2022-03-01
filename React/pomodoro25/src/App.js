
import React from "react";



const Break = (props) => {
  return (
    <div className="break">
      <div id="break-label">Break Length</div>
      <div className="clickBtn">
        <button onClick={(e) => props.breakControl(e)} id="break-decrement"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg></button>
        <span id="break-length">{props.breakLength}</span>
        <button onClick={(e) => props.breakControl(e)} id="break-increment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg></button>
        
      </div>

    </div>
  )
}

const Session = (props) => {
  return (
    <div className="session">
      <div id="session-label">Session Length</div>
      <div className="clickBtn">
        <button onClick={(e) => props.sessionControl(e)} id="session-decrement"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg></button>
        <span id="session-length">{props.sessionLength}</span>
        <button onClick={(e) => props.sessionControl(e)} id="session-increment"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
</svg></button>
      </div>

    </div>
  )
}

const Display = (props) => {
  let minutes = Math.floor(props.timer / 60)
  let seconds = props.timer % 60
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  return (
    <div id="display">
      <div id="timer-label">
        <h4>{props.stage}</h4>
        <div id="time-left" >
          {minutes}:{seconds}
        </div>
      </div>
      <div className="btn-control" >
        <button id="start_stop" onClick={(e) => props.playControl(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
  <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg></button>
        <button id="reset" onClick={(e) => props.playControl(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg></button>
      </div>

    </div>
  )


}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "Session",
      breakLength: 5,
      sessionLength: 25,
      play: false,
      timer: 1500
    }
    this.lengthControl = this.lengthControl.bind(this)
  }
  lengthControl(e) {
    const id = e.currentTarget.id
    
    if (this.state.breakLength > 1 && id === "break-decrement" && this.state.stage === "Session" && !this.state.play) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1
      }));
    } else if (this.state.breakLength > 1 && id === "break-decrement" && this.state.stage === "Break" && !this.state.play) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1,
        timer: (state.breakLength - 1) * 60
      }));
    } else if (this.state.breakLength < 60 && id === "break-increment" && this.state.stage === "Session" && !this.state.play) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1
      }));
    }
    else if (this.state.breakLength < 60 && id === "break-increment" && this.state.stage === "Break" && !this.state.play) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1,
        timer: (state.breakLength + 1) * 60
      }));
    } else if (this.state.sessionLength > 1 && id === "session-decrement" && this.state.stage === "Session" && !this.state.play) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1,
        timer: (state.sessionLength - 1) * 60
      }));

    } else if (this.state.sessionLength > 1 && id === "session-decrement" && this.state.stage === "Break" && !this.state.play) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1
      }));
    } else if (this.state.sessionLength < 60 && id === "session-increment" && this.state.stage === "Session" && !this.state.play) {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1,
        timer: (state.sessionLength + 1) * 60
      }));
    }
    else if (this.state.sessionLength < 60 && id === "session-increment" && this.state.stage === "Break" && !this.state.play) {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1
      }));
    } else {
      switch (id) {
        case "start_stop":
          this.setState((state) => ({
            play: !state.play
          }));
          break;
        case "reset":
          const clockAudio = document.getElementById("beep");
          clockAudio.pause();
          clockAudio.currentTime = 0;
          this.setState({
            stage: "Session",
            breakLength: 5,
            sessionLength: 25,
            play: false,
            timer: 1500
          });
          break;
        default:
          console.log("How are you?")
      }
    }
  }


  displayControl() {
    const clockAudio = document.getElementById("beep")
    if (this.state.play && this.state.timer >= 1) {
      this.setState((state) => ({
        timer: state.timer - 1
      }))

    } else if (this.state.play && this.state.stage === 'Session' && this.state.timer <= 0) {
      clockAudio.play();
      this.setState((state) => ({
        stage: "Break",
        timer: state.breakLength * 60,
        play: true
      }))
    } else if (this.state.play && this.state.stage === 'Break' && this.state.timer <= 0) {
      clockAudio.play();
      this.setState((state) => ({
        stage: "Session",
        timer: state.sessionLength * 60,
        play: true
      }))
    }
  }
  componentDidMount() {
    this.countDown = setInterval(() => this.displayControl(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.countDown)
  }
  render() {
    return (
      <div id="main">
        <div className="length-control">
          <Break
            breakControl={this.lengthControl}
            breakLength={this.state.breakLength}
          />
          <Session
            sessionControl={this.lengthControl}
            sessionLength={this.state.sessionLength}
          />
        </div>
        <div className="display">
          <Display
            playControl={this.lengthControl}
            timer={this.state.timer}
            stage={this.state.stage}
          />
          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>

    )



  }
}






export default App