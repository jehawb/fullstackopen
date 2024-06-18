const Persons = ({ persons, searchName }) => {

  const personsToShow = searchName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number ? person.number : ''}</li>
      )}
    </ul>
  )
}

export default Persons