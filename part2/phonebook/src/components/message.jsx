const SuccessMessage = ({ message }) =>
{
    if (message === null)
        return null

    const SuccessStyle = 
    {
        color: 'green',
        background: 'lightGrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={SuccessStyle}>
            {message}
        </div>
    )
}

const ErrorMessage = ({ message }) =>
{
    if (message === null)
        return null

    const ErrorStyle = 
    {
        color: 'red',
        background: 'lightGrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={ErrorStyle}>
            {message}
        </div>
    )
}

export default { SuccessMessage, ErrorMessage }