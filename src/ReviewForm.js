import {useState} from "react";

export function ReviewForm(props) {
    const emptyReview = {
        text: '',
        author: '',
    }
    const [formState, setFormState] = useState({...emptyReview});

    const handleOnChange = (event) => {
        if (event.target.name === 'textText') {
            setFormState({...formState, text: event.target.value});
        } else if (event.target.name === 'authorText') {
            setFormState({...formState, author: event.target.value});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Must have some props.text
        if (formState.text.length > 0) {
            // Set an anonymous author.
            setFormState({...formState, author: 'Anonymous Hipster'});

            // Clear the form.
            setFormState({...emptyReview});

            // Callback to submit the review
            props.createReview(props.shopId, {...formState});
        }
    };

    return <form onChange={(event) => handleOnChange(event)}
                 onSubmit={(event) => handleSubmit(event)}
    >
        <label>Write a review</label>
        <input type='text'
               name='textText'
               value={formState.text}
        />
        <label>Author</label>
        <input type='text'
               name='authorText'
               value={formState.author}
        />
        <button type='submit'>Submit</button>
    </form>;
}