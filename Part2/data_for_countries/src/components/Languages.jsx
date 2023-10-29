const Languages = ({ languages }) => {

    return (
        <>
            <h2>languages</h2>
            <ul>
                {Object.values(languages).map(language => {
                    return <li key={language}>{language}</li>
                })}
            </ul>
        </>
    )
}

export {
    Languages
}