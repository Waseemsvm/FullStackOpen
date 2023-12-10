const Notification = (props) => {
    
    console.log(props.message)
    const message = props.message?.text;
    const error = props.message?.error;

    // const message = null;
    // const error = null;

    if (!message) {
        return null;
    }

    return (
        <div className={error ? "error" : "success"}>
            {message}
        </div>
    );
}

export {
    Notification
}