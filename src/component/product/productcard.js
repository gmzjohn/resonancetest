import React from 'react';
import axios from "axios";

function sendEmail(description, e) {
    console.log(description);
    console.log(e);

    axios.post('https://fp9cx0d5i0.execute-api.us-east-1.amazonaws.com/Resonance', 
    {
        desc: description
    })
    .then((resp) => resp.json())
      .then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    
}

const ProductCard = ({ Name, Notes, Description, Picture }) => (
    <div className="r-card r-card-img">
        <img className="r-img" src={Picture[0].url} />
        <div className="r-container">
            <h4><b>{Name}</b></h4>
            <p>{Notes}</p>
        </div>
        <button
            className="btn btn-lg btn-primary btn-block text-uppercase"
            onClick={(e) => sendEmail(Description, e)}
        >
            Request Information
        </button>
    </div>
);

export default ProductCard;