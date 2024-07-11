const Persons = ({ persons, searchName, deletePerson }) => {

  // For displaying the search results
  const personsToShow = searchName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number ? person.number : ''} <button onClick={() => deletePerson(person.name, person.id)}>Delete</button> </li>
      )}
    </ul>
  )
}

export default Persons