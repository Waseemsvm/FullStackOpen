const Persons = ({ persons, handleDelete }) => {
    console.log("Persons component",persons)
    return (
        <div>
            {persons.map(person =>
            <div key={person.name}>
                <span>
                    {person.name} {person.number} 
                </span>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>)}
        </div>
    );
}

export default Persons;