const CountrySearch = ({ searchName, handleSearchNameChange }) => {
    return (
        <>
            Find a country 🔍 <input value={searchName} onChange={handleSearchNameChange} />
        </>
    )
}

export default CountrySearch