import {Shop} from "./Shop";

export const ShopList = (props) => {
    return <>
        <div>Here's all the snobby coffee shop other hipsters have shared. Rate and give a review.</div>
        <ul>
            {props.shops.map((shop) => {
                return <li key={shop.id}>
                    <Shop key={shop.id}
                          shop={shop}
                          setCurrentShop={props.setCurrentShop}
                    />
                </li>
            })}
        </ul>
    </>
}