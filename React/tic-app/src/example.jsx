import React from "react";
import ReactDOM from "react-dom";

//function(tick)  &&  setInterval(tick,1000)
// eslint-disable-next-line no-lone-blocks
{
  /* 
  function tick () {
      const element=(
      <div>
          <h1>Hello, Manta!</h1>
          <h2>Watch the time {new Date().toLocaleTimeString()}</h2>
      </div>   
      )
      ReactDOM.render(
          element,document.getElementById("clock")
      )
      }
      setInterval(tick,1000);
  */
}

//function Clock(props) && function tick()  &&  setInterval(tick, 1000);
// eslint-disable-next-line no-lone-blocks
{
  /*
  function Clock(props){
  return(
      <div>
      <h1>Hello, Manta!</h1>
      <h2>Watch the time {props.date.toLocaleTimeString()}</h2>
  </div> 
  )
  }
  
  function tick(){
  ReactDOM.render(
      <Clock date={new Date()}/>,
      document.getElementById("clock"))
  
  }
  setInterval(tick,1000);
  */
}
//Class React.Component
// eslint-disable-next-line no-lone-blocks
{
  /*
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}
setInterval(tick, 1000);
*/
}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
