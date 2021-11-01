import {useState} from "react";

export const ShopCreator = (props) => {
    const emptyShop = {
        name: '',
        address: '',
        website: ''
    }

    const [formData, setFormData] = useState({...emptyShop});

    const handleOnChange = (event) => {
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.value);
        // console.log(event.target.name)

        if (event.target.name === "nameText") {
            setFormData({...formData, name: event.target.value});
        } else if (event.target.name === "addressText") {
            setFormData({...formData, address: event.target.value});
        } else if (event.target.name === "websiteText") {
            setFormData({...formData, website: event.target.value});
        }
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // Submit the new shop if it has a name and address.
        if (formData.name.length > 0 && formData.address.length > 0) {
            props.createShop(formData);
            setFormData({...emptyShop});  // Clear the form after submitting.
        }
    };

    return <div>Add a snobby coffee shop that only you know about.
        <form onSubmit={(event) => {handleOnSubmit(event)}}
        >
            <label>Name</label>
            <input type="text"
                   name="nameText"
                   value={formData.name}
                   onChange={(event) => handleOnChange(event)}
            />
            <label>Address</label>
            <input type="text"
                   name="addressText"
                   value={formData.address}
                   onChange={(event) => handleOnChange(event)}
            />
            <label>Website (optional)</label>
            <input type="text"
                   name="websiteText"
                   value={formData.website}
                   onChange={(event) => handleOnChange(event)}
            />
            <button type="submit">Add</button>
        </form>
    </div>;
}