const Filter = ({handleFilter}) => {

    return (
        <div>
            <span>filter shown value with </span><input onChange={handleFilter} />
        </div>
    );
}

export default Filter;