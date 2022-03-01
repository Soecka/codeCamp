import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const DrumPad = ({ id, triggerKey, clipName, clipUrl, setDisplay }) => {
    const handleClick = () => {
        setDisplay(clipName.replace(/-/g, " "));
        document.getElementById(clipName).classList.toggle("drum-pad-active");
        setTimeout(
            () =>
                document.getElementById(clipName).classList.toggle("drum-pad-active"),
            100
        );
        const audio = document.getElementById(triggerKey);
        audio.currentTime = 0;
        audio.play();
    };
    return (
        <button id={clipName} className="drum-pad" onClick={handleClick}>
            {triggerKey}
            <audio className="clip" id={triggerKey} src={clipUrl}>
                Your browser does not support the audio element.
            </audio>
        </button>
    );
};

const App = () => {
    const bankOne = [
        {
            id: 1,
            triggerKey: "Q",
            clipName: "Heater-1",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
            id: 2,
            triggerKey: "W",
            clipName: "Heater-2",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
            id: 3,
            triggerKey: "E",
            clipName: "Heater-3",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
            id: 4,
            triggerKey: "A",
            clipName: "Heater-4",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
            id: 5,
            triggerKey: "S",
            clipName: "Clap",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
            id: 6,
            triggerKey: "D",
            clipName: "Open-HH",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
            id: 7,
            triggerKey: "Z",
            clipName: "Kick-n'-Hat",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
            id: 8,
            triggerKey: "X",
            clipName: "Kick",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
            id: 9,
            triggerKey: "C",
            clipName: "Closed-HH",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
    ];
    const bankTwo = [
        {
            id: 10,
            triggerKey: "Q",
            clipName: "Chord-1",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        },
        {
            id: 11,
            triggerKey: "W",
            clipName: "Chord-2",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        },
        {
            id: 12,
            triggerKey: "E",
            clipName: "Chord-3",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        },
        {
            id: 13,
            triggerKey: "A",
            clipName: "Shaker",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        },
        {
            id: 14,
            triggerKey: "S",
            clipName: "Open-HH",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        },
        {
            id: 15,
            triggerKey: "D",
            clipName: "Closed-HH",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        },
        {
            id: 16,
            triggerKey: "Z",
            clipName: "Punchy-Kick",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        },
        {
            id: 17,
            triggerKey: "X",
            clipName: "Side-Stick",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        },
        {
            id: 18,
            triggerKey: "C",
            clipName: "Snare",
            clipUrl: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        }
    ];
    const triggerKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
    const [currentBank, setCurrentBank] = React.useState(bankOne);
    const [display, setDisplay] = React.useState("");
    const [volume, setVolume] = React.useState(0.15);

    const updateVolume = (v) => {
        const clips = document.getElementsByClassName("clip");
        for (let i = 0; i < clips.length; i++) {
            clips[i].volume = v;
        }
    };

    React.useEffect(() => {
        const unsubscribe = () => {
            document.getElementById("bankOne").checked = true;
            updateVolume(volume);
            document.addEventListener("keyup", (e) => {
                if (e.key === "b") {
                    const radios = document.getElementsByClassName("bank-radio");
                    if (radios[radios.length - 1].checked) radios[0].click();
                    else {
                        for (let i = 0; i < radios.length - 1; i++) {
                            if (radios[i].checked) {
                                radios[i + 1].click();
                                break;
                            }
                        }
                    }
                }
            });
            document.addEventListener("keydown", (e) => {
                if (triggerKeys.includes(e.key.toUpperCase())) {
                    const btns = document.getElementsByClassName("drum-pad");
                    for (let i = 0; i < btns.length; i++) {
                        if (btns[i].innerText === e.key.toUpperCase()) {
                            btns[i].click();
                        }
                    }
                }
            });
        };
        unsubscribe();
        return () => unsubscribe();
    }, []);
    return (
        <div id="drum-machine">
            <h1 id="title">
                Digi-Drums
                <small>Make your own beat 🥁🎹</small>
            </h1>

            <div className="drum-pads">
                {currentBank.map((btn) => (
                    <DrumPad
                        key={btn.id}
                        id={btn.id}
                        triggerKey={btn.triggerKey}
                        clipName={btn.clipName}
                        clipUrl={btn.clipUrl}
                        setDisplay={setDisplay}
                    />
                ))}
            </div>

            <div id="controls">
                <div id="bank-chooser">
                    <label for="bankOne">
                        Bank one
                        <input
                            type="radio"
                            id="bankOne"
                            name="bank-group"
                            value="bankOne"
                            className="bank-radio"
                            onChange={() => {
                                setCurrentBank(bankOne);
                                setDisplay("Bank one");
                            }}
                        />
                    </label>
                    <label for="bankTwo">
                        Bank two
                        <input
                            type="radio"
                            id="bankTwo"
                            name="bank-group"
                            value="bankTwo"
                            className="bank-radio"
                            onChange={() => {
                                setCurrentBank(bankTwo);
                                setDisplay("Bank two");
                            }}
                        />
                    </label>
                </div>
                <p id="display">{display}</p>

                <div className="volume-slider-container">
                    <label for="volume-slider">Volume</label>
                    <input
                        id="volume-slider"
                        type="range"
                        max="1"
                        min="0"
                        step="0.01"
                        value={volume}
                        onInput={(e) => {
                            const vol = e.target.value;
                            updateVolume(vol);
                            setDisplay(`Volume: ${parseInt(vol * 100)}`);
                            setVolume(vol);
                        }}
                        onChange={() => setTimeout(() => setDisplay(""), 3000)}
                    />
                </div>
            </div>
            <p id="made-by">Made with ❤ by Gautam Tiwari</p>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
