export const Shop = (props) => {
    const handleOnClick = (event) => {
        event.preventDefault();
        props.setCurrentShop(props.shop);
    }

    return <div>
        <div onClick={(event) => handleOnClick(event)}>{props.shop.name}</div>
    </div>
};