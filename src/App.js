import './App.css';
import {ShopList} from "./ShopList";
import {ShopCreator} from "./ShopCreator";
import {useEffect, useState} from "react";

const API_URL = "http://localhost:8080/shop";

const App = () => {
    const [shops, setShops] = useState([]);

    // Load all the shops after the first render.
    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(json => setShops(json));
    }, []);

    const createShop = (newShop) => {
        console.log(newShop);
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newShop)
        })
            .then(response => response.json())
            .then(json => console.log(json));
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
            />
        </div>
    );
}

export default App;
