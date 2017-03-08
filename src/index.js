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
            currentValue: ''
        }
    }
    updateCurrentValue = (e) => {
        this.setState({
            currentValue: e.target.value,
            entries: this.filter(new RegExp(e.target.value, 'i'))
            })
    }

    filter = (regex) => {
        var names = this.state.entryStore;
        return names.filter((param) => regex.test(param));
    }
    filterByName = (person) =>  {
        return this.state.regex.test(person);
    }
    deletePerson = (id) => {
        this.setState({
            entries: this.returnDeleted(this.state.entries, id.target.value)
        })
    }

    returnDeleted = (array, id) => {
        array.splice(id, 1);
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
            <List entries={this.state.entries} deletePerson={this.deletePerson}/>
        </div>
    }
}

function Button({value, onClick}) {
    return <button value={value} onClick={onClick}
    >+</button>
}

function List({entries, deletePerson}) {
    return <div>
        {
            entries.map(
                (entry, index) =>
                    <Person key={index} id={index} name={entry} deletePerson={deletePerson.bind(index)}/>)
        }
    </div>
}

function Person ({id, name, deletePerson}) {
    return <div className="person" >Name: {name}<Button value={id} onClick={deletePerson}/></div>
}
Person.propTypes = {
    name: React.PropTypes.string
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);