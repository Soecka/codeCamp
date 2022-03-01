import React from "react";
import ReactDOM from "react-dom";

const bankOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

const bankTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];


class DrumPad extends React.Component {
    constructor(props) {
        super(props)
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress)
    }
    handleKeyPress(e) {
        if (e.keyCode === this.props.keyCode) {
            this.playSound();

        }
    }
    playSound() {
        
        if(this.props.power){
            const sound = document.getElementById(this.props.keyTrigger)
            sound.currentTime = 0;
            sound.volume=this.props.volume;
            sound.play();
            this.props.updateDisplay(this.props.id.replace(/-/g, " "))
        }
        
    }
    render() {
        return (

            <div className='drum-pad'
                id={this.props.id}
                onClick={this.playSound} >
                <span>{this.props.keyTrigger}</span>
                <audio className="clip"
                    id={this.props.keyTrigger}
                    src={this.props.url}></audio>
            </div>
        )
    }
}


class PadBank extends React.Component {

    render() {
        const currentBank = this.props.currentBank;
        const padBank = currentBank.map((e, i, arr) => {
            return (
                <DrumPad
                    id={arr[i].id}
                    keyTrigger={arr[i].keyTrigger}
                    keyCode={arr[i].keyCode}
                    url={arr[i].url}
                    updateDisplay={this.props.updateDisplay}
                    volume={this.props.volume}
                    power={this.props.power}
                />)
        })

        return (
            < div className="pad-bank" >
                {padBank}
            </div >
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            power: true,
            display: String.fromCharCode(160),
            currentBank: bankOne,
            sliderVal: 0.3

        }
        this.powerSwitch = this.powerSwitch.bind(this);
        this.bankSwitch = this.bankSwitch.bind(this);
        this.volumeControl = this.volumeControl.bind(this);
        this.displayClip = this.displayClip.bind(this)
    }
    powerSwitch() {

        this.setState({
            power: !this.state.power
        })
    }
    bankSwitch(e) {
        if (e.target.checked) {
            this.setState({
                display: 'Smooth Piano Kit',
                currentBank: bankTwo
            })
        } else {
            this.setState({
                display: 'Header Kit',
                currentBank: bankOne
            })
        }
    }
    volumeControl(e) {
        this.setState({
            sliderVal: e.target.value,
            display: 'Volume: ' + Math.round(e.target.value * 100)
        })
    }
    displayClip(name) {
        if (this.state.power) {
            this.setState({
                display: name
            })
        }
    }


    render() {

        return (
            <div id="drum-machine">


                <PadBank
                    currentBank={this.state.currentBank}
                    updateDisplay={this.displayClip}
                    volume={this.state.sliderVal}
                    power={this.state.power}
                />

                <div className="display-area">
                    <div className='powerSwitch'>
                        <input type="checkbox"
                            id="powerSwitch"
                            value='0'
                            name="powerSwitch"
                            defaultChecked={this.state.power}
                            onChange={this.powerSwitch}
                        />
                        <label htmlFor="powerSwitch">Power</label>
                    </div>

                    <div id="display">{this.state.display}</div>

                    <div className="volume-control">
                        
                        <input type="range"
                            max='1'
                            min='0'
                            step='0.01'
                            value={this.state.sliderVal}
                            onChange={this.volumeControl}
                            id="volume-slider"
                        />
                        <label htmlFor="volume-slider"></label>


                    </div>
                    <div class="bankSwitch">
                        <input type="checkbox" id="bankSwitch" value="0" name="bankSwitch" onChange={this.bankSwitch} />
                        <label htmlFor="bankSwitch">Bank</label>
                    </div>
                </div>
            </div>
        )




    }


}

ReactDOM.render(<App />, document.getElementById('app'))