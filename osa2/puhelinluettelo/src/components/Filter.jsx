const Filter = ({ searchName, handleSearchNameChange }) => {
  return (
    <>
      Find from phonebook: <input value={searchName} onChange={handleSearchNameChange} />
    </>
  )
}

export default Filter
