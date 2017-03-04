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
            <List entries={this.state.entries}/>
        </div>
    }
}

function Button({onClick}) {
    return <button onClick={onClick}
    >+</button>
}

function List({entries}) {
    return <div>
        {
            entries.map(
                (entry, index) =>
                    <Person key={index} name={entry}/>)
        }
    </div>
}

function Person ({name}) {
    return <div className="person" >Name: {name}</div>
}
Person.propTypes = {
    name: React.PropTypes.string
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);