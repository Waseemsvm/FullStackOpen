const Form = (props) => {

    const { handleChangeName, handleChangeNumber, handleSubmit} = props.events;
    const {newName, newNumber} = props;

    return (
        <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleChangeName} /></div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}

export default Form;