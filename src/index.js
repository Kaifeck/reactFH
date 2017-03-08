import React from 'react';
import ReactDOM from 'react-dom';
import Input from './input';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            entries: ['Stefanie', 'Sepp', 'Alex'],
            entryStore: ['Stefanie', 'Sepp', 'Alex'],
            currentValue: '',
            editValue: ''
        }
    }
    updateCurrentValue = (e) => {
        this.setState({
            currentValue: e.target.value,
            entries: this.filter(new RegExp(e.target.value, 'i'))
            })
    }
    updateEditValue = (e) => {
        this.setState({
            editValue: e.target.value
        })
    }

    filter = (regex) => {
        var names = this.state.entryStore;
        return names.filter((param) => regex.test(param));
    }

    deletePerson = (id) => {
        this.setState({
            entries: this.returnDeleted(this.state.entries, id.target.value),
            entryStore: this.returnDeleted(this.state.entries, id.target.value)
        })
    }

    returnDeleted = (array, id) => {
        array.splice(id, 1);
        return array;
    }

    editPerson = (id) => {
        this.setState({
            entries: this.returnEdited(this.state.entries, id.target.value),
            entryStore: this.returnEdited(this.state.entries, id.target.value)
        })
    }

    returnEdited = (array, id) => {
        array[id] = this.state.editValue;
        return array;
    }

    render(){
        return <div>
            <Input value={this.state.currentValue} onChange={this.updateCurrentValue}/><Button onClick={
        () => {
          this.setState({
            entries: [...this.state.entries, this.state.currentValue],
            entryStore: [...this.state.entryStore, this.state.currentValue]
          })
        }
        }/>
            <Input value={this.state.editValue} onChange={this.updateEditValue}/>
            <List entries={this.state.entries} deletePerson={this.deletePerson} editPerson={this.editPerson}/>
        </div>
    }
}

function Button({value, onClick}) {
    return <button value={value} onClick={onClick}
    >+</button>
}

function List({entries, deletePerson, editPerson}) {
    return <div>
        {
            entries.map(
                (entry, index) =>
                    <Person key={index} id={index} name={entry} deletePerson={deletePerson.bind(index)} editPerson={editPerson.bind(index)}/>)
        }
    </div>
}

function Person ({id, name, deletePerson, editPerson}) {
    return <div className="person" >Name: {name}<Button value={id} onClick={deletePerson}/><Button value={id} onClick={editPerson}/></div>
}
Person.propTypes = {
    name: React.PropTypes.string
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);