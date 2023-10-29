const Filter = ({ query, handleQuery }) => {

    return (
        <>
            <span>
                find countries
            </span>
            <input value={query} onChange={handleQuery} />
        </>
    );
}

export {
    Filter
}
