import React from 'react'
import Table from './Table'
import Form from './Form'
class App extends React.Component {
    state = {
        characters: [],
    }
    removeCharacter = (index) => {
        const {characters} = this.state

        this.setState({
            characters: characters.filter((index, i) => {
                return i !== index
            })
        })
    }
    handleSubmit=(characters)=>{
        this.setState({
            characters:[...this.state.characters,characters]
        })
    }
    render() {
        const { characters } = this.state
        return (
            <div className="container">
                <Table characterData={characters} removeCharacter={this.removeCharacter} />
                <Form handleSubmit= {this.handleSubmit} />
            </div>
        )
    }
}


export default App