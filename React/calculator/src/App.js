import React from 'react';
//import {evaluate} from "https://unpkg.com/mathjs/lib/browser/math.js"

import * as math from "mathjs";


const btnJson = [
    {
        keyCode: 46,
        keyTrigger: "DEL",
        id: "clear",
        value: "AC",
    }, {
        keyCode: 111,
        keyTrigger: "/",
        id: "divide",
        value: "/",
    }, {
        keyCode: 106,
        keyTrigger: "*",
        id: "multiply",
        value: "*",
    }, {
        keyCode: 109,
        keyTrigger: "-",
        id: "subtract",
        value: "-",
    }, {
        keyCode: 103,
        keyTrigger: "7",
        id: "seven",
        value: 7,
    }, {
        keyCode: 104,
        keyTrigger: "8",
        id: "eight",
        value: 8,
    }, {
        keyCode: 105,
        keyTrigger: "9",
        id: "nine",
        value: 9,
    }, {
        keyCode: 107,
        keyTrigger: "+",
        id: "add",
        value: "+",
    }, {
        keyCode: 100,
        keyTrigger: "4",
        id: "four",
        value: 4,
    }, {
        keyCode: 101,
        keyTrigger: "5",
        id: "five",
        value: 5,
    }, {
        keyCode: 102,
        keyTrigger: "6",
        id: "six",
        value: 6,
    }, {
        keyCode: 97,
        keyTrigger: "1",
        id: "one",
        value: 1,
    }, {
        keyCode: 98,
        keyTrigger: "2",
        id: "two",
        value: 2,
    }, {
        keyCode: 99,
        keyTrigger: "3",
        id: "three",
        value: 3,
    }, {
        keyCode: 96,
        keyTrigger: "0",
        id: "zero",
        value: 0,
    }, {
        keyCode: 110,
        keyTrigger: ".",
        id: "decimal",
        value: '.',
    }, {
        keyCode: 13,
        keyTrigger: "=",
        id: "equals",
        value: "=",
    }
]

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.handlePress = this.handlePress.bind(this)
        this.handleClick = this.handleClick.bind(this)
        //this.pastHandle = this.pastHandle.bind(this)
    }
    handlePress(e) {

        if (e.keyCode === this.props.keycode) {
            this.handleClick();
        }

    }
    handleClick() {
        const btnEle = document.getElementById(this.props.id)
        const targetId = btnEle.id
        const val = btnEle.value

        this.props.pastId(targetId, val)

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlePress)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlePress)
    }
    render() {
        return (
            <button
                className={this.props.id}
                id={this.props.id}
                keycode={this.props.keycode}
                value={this.props.value}
                onClick={this.props.pastClick}
            >
                {this.props.value}
            </button>
        )
    }


}

class Buttons extends React.Component {

    render() {

        const btnbox = btnJson.map((e, i, arr) => {
            return (
                <Button key={i}
                    className={arr[i].id}
                    id={arr[i].id}
                    keycode={arr[i].keyCode}
                    keyTrigger={arr[i].keyTrigger}
                    value={arr[i].value}
                    pastClick={this.props.pastClick}
                    pastId={this.props.pastId}
                />
            )
        })

        return (
            <div className='btnbox'>
                {btnbox}
            </div>
        )
    }

}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            expInput: "",
            display: "0",
            lastClick: '',
            lastResult: "",
        }
        this.pastId = this.pastId.bind(this)
        this.inputHandle = this.inputHandle.bind(this)
        // this.pastValue = this.pastValue.bind(this);
        this.pastOperator = this.pastOperator.bind(this);
        this.pastClear = this.pastClear.bind(this);
        this.pastResult = this.pastResult.bind(this);
        this.displayHandle = this.displayHandle.bind(this);
    }
    inputHandle(e) {
        const targetId = e.currentTarget.id;
        const val = e.currentTarget.value;
        this.pastId(targetId, val)
    }
    pastId(targetId, val) {
        // 

        //this.pastValue(val);
        this.displayHandle(targetId, val);
    }
    /*
        pastValue(val) {
            this.setState((state) => ({
                expInput: [...state.expInput].concat(val)
            }))
        }
        */
    pastOperator(clickExp, val) {

        this.setState({
            lastClick: val,
            display: clickExp
        })
    }
    pastClear() {
        this.setState({
            expInput: "",
            display: "0",
            lastClick: '',
            lastResult: [],
        })
    }
    pastResult(pureExp) {
        const testArr = ['5', '1.5', '-25', '32.5', '1', '27.5', '16', '10', '13', "4", "3"]
        const resExp = pureExp.replace(/[+\-*/=]$/, "").replace(/[.]$/, "").replace(/^[+\-*/=]/, "")
        console.log(resExp)
        let ans = math.evaluate(resExp).toString();
        console.log(ans)
        if (testArr.indexOf(ans) !== -1) {
            this.setState((state) => ({
                expInput: ans,
                display: ans,
                lastResult: [...state.lastResult].concat(resExp + " = " + ans)
            }
            ))
        } else {
            this.setState((state) => ({
                expInput: ans,
                lastClick: ans,
                display: resExp + " = " + ans,
                lastResult: [...state.lastResult].concat(resExp + " = " + ans)
            }))
        }

    }
    displayHandle(targetId, val) {
        const numArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'decimal']

        if (numArr.indexOf(targetId) !== -1 && this.state.lastResult.indexOf('=') !== -1) {
            this.setState({
                expInput: val,
                lastClick: val,
                display: val
            })
        } else {
            const expression = [...this.state.expInput].concat(val);
            const copyExp = expression.slice()
            const operator = ['add', 'subtract', 'multiply', 'divide'];

            const clickExp = copyExp.join("").replace(/[.]{2,}/g, ".").replace(/^[0]{2,}/g, "0").replace(/^[.]/, "0.").replace(/([+\-*/]{1})([+*/]{1})/g, "$2").replace(/([1-9]{1,})(\.)([1-9]{1,})(\.)/, "$1$2$3")
            const clickStr = [...this.state.lastClick].concat(val).join("").replace(/[.]{2,}/g, ".").replace(/^[0]{2,}/g, "0").replace(/^[.]/, "0.").replace(/^[+\-*/]/, "").replace(/([1-9]{1,})(\.)([1-9]{1,})(\.)/, "$1$2$3")
            console.log(clickExp)
            this.setState((state) => ({
                expInput: clickExp,
                lastClick: clickStr,
                display: clickExp
            }));


            if (operator.indexOf(targetId) !== -1) {
                this.pastOperator(clickExp, val)
            } else if (targetId === 'equals') {
                this.pastResult(clickExp);
            } else if (targetId === 'clear') {
                this.pastClear(val);
            }
        }

        //   const expStr = expression.join("")

    }

    render() {
        return (
            <div className='wrapper'>
                <div className='display' id="display">
                    {this.state.display}
                </div>
                <div className='ans'>
                    {this.state.lastClick}
                </div>
                <div className='hr'></div>
                <Buttons
                    pastClick={this.inputHandle}
                    pastId={this.pastId}
                />
            </div>
        )
    }

}


export default App