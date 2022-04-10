import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list';
import SearchBox from './components/search-box/search-box';
import './App.css';


const App = () => {
  //react will re-render WHENEVER searchField or the state changes
  console.log('render')
  const [monsters, setMonsters] = useState([])
  const [searchField, setSearchField] = useState('')
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    //users != users...this is calling to an outside api thus its not the same reference
    //as our users called in memory
    .then((users) => setMonsters(users))
  }, [])

  
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])


  //lower case the search text 
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }


  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box' 
        onChangeHandler={onSearchChange} 
        placeholder='search-monsters'
      />
      <CardList 
        monsters={filteredMonsters}
      />
    </div>
  )
}


//#1 Constructor rendered first
// React will rerender whenever props change or set state gets called
// class App extends Component {
//   constructor() { 
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   //#3 this gets rendered 3rd
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users}
//       })
//     )
//   }

//   onSearchChange = (event) => {
//     //lower case the search text 
//     const searchField = event.target.value.toLocaleLowerCase()
//     this.setState(() => {
//       return {searchField}
//     })
//   }

//   //#2 Render rendered 2nd
//   render() {
//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     //lower case the actual names
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField)
//     })

//     return (
//     <div className="App">
//       <h1 className='app-title'>Monsters Rolodex</h1>

//       <SearchBox
//         className='monsters-search-box' 
//         onChangeHandler={onSearchChange} 
//         placeholder='search-monsters'
//       />
//       <CardList 
//         monsters={filteredMonsters}
//       />
//     </div>
//     );
//   }
// } 

export default App;
