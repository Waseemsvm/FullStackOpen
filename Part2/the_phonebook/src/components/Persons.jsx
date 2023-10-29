const Persons = ({ persons, handleDelete }) => {
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