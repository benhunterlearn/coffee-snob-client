import './App.css';
import {ShopList} from "./ShopList";
import {ShopCreator} from "./ShopCreator";
import {useEffect, useState} from "react";
import {ShopDetail} from "./ShopDetail";

const API_URL = "http://localhost:8080/shop";

const App = () => {
    const [shops, setShops] = useState([]);
    const [currentShop, setCurrentShop] = useState(null);

    // Load all the shops after the first render.
    useEffect(() => {
        loadShops();
    }, []);

    const loadShops = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(json => setShops(json));
    }

    const createShop = (newShop) => {
        // console.log(newShop);
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newShop)
        })
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                // Add the newly create shop to state.
                setShops([...shops, json]);
                // Load all the shops to update if anything else changed.
                loadShops();
            });
    }

    const deleteShop = (shop) => {
        // DELETE request to server
        fetch(API_URL + '/' + shop.id.toString(), {
            method: 'DELETE',
        })
            .then(response => {
                // Remove the shop we are deleting from state.
                setShops([...shops].filter(shopElement => shop.id !== shopElement.id));

                // Clear the currentShop so the shop details do not show.
                setCurrentShop(null);

                // Load all the shops to update anything that my have changed.
                loadShops();
            });

    }


    return (
        <div>
            <header>
                Coffee Snob
            </header>
            <ShopCreator
                createShop={(newShop) => createShop(newShop)}
            />
            <ShopList shops={shops}
                      setCurrentShop={(shop) => setCurrentShop(shop)}
            />
            <ShopDetail shop={currentShop}
                        deleteShop={(shop) => deleteShop(shop)}
            />
        </div>
    );
}

export default App;
