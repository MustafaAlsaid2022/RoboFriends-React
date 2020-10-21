import React, { Component } from 'react'
import CardList from '../components/CardList'
//import { robot } from './robots'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'



class App extends Component {
    constructor() {
        super()
        this.state = {
            robot: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robot: users }))
    }

    onSearchChange = (e) => {
        this.setState({ searchField: e.target.value })
    }

    render() {
        const { robot, searchField } = this.state
        const filterRobot = robot.filter((r) => {
            return r.name.toLowerCase().includes(searchField)
        })

        return !robot.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                        <CardList robot={filterRobot} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
    }
}

export default App