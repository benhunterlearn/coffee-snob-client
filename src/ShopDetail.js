import {useEffect, useState} from "react";
import {ReviewForm} from "./ReviewForm";

const ShopReviews = (props) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = () => {
        // GET all the reviews for props.shop.
        fetch("http://localhost:8080/review/shop/" + props.shop.id)
            .then(response => response.json())
            .then(json => setReviews(json));
    }

    const renderReviewsOrNone = () => {
        if (reviews.length > 0) {
            return (<ul>
                {reviews.map((review) => {
                    return <>
                        <div>Review: {review.text}</div>
                        <div>Reviewed by: {review.author}</div>
                    </>
                })}
            </ul>);
        } else {
            return (<div>
                No reviews yet, be the first.
            </div>);
        }
    };

    function createReview(shopId, review) {
        fetch('http://localhost:8080/review/shop/' + shopId.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review),
        })
            .then(response => response.json())
            .then(json => {
                setReviews([...reviews, json]);
                loadReviews();
            });
    }

    return <>
        Reviews
        {renderReviewsOrNone()}
        <ReviewForm shopId={props.shop.id}
                    createReview={(shopId, review) => createReview(shopId, review)}
        />
    </>
}

export const ShopDetail = (props) => {
    // Render details about a shop if one is currently selected.

    function renderShop() {
        return <>
            Shop Details
            <div>Name: {props.shop.name}</div>
            <div>Address: {props.shop.address}</div>
            <div>Website: {props.shop.website}</div>
            <ShopReviews shop={props.shop}/>
            <button onClick={() => props.deleteShop(props.shop)}>Delete Shop</button>
        </>;
    }

    return <div>
        {props.shop ?
            renderShop() :
            null
        }
    </div>;
}