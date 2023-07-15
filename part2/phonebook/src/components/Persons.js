import Person from './Person'
const Persons = ({ persons, filter, handleDelete }) => {
   return <ul>
        {persons.
          filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).
          map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/> )}
      </ul>
}
export default Persons