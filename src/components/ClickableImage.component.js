export const ClickableImage = ({ source }) => {
    const clickHandler = () => {
        
    }

    return (
        <img src={source} alt={source} onClick={clickHandler} />
    )
}