import React from 'react';

import './product.css';

const ProductCard = ({ Name, Notes, Description, Picture }) => (
    <div className="card r-card-img">
        <img className="card-img-top" src={Picture[0].url} alt="Movie poster" />
        <div className="card-body">
            <h5 className="card-title">{Name}</h5>
            {/* <p className="card-text">{Description}</p> */}
            {/* <p className="card-text">
                <small className="text-muted">{Notes}</small>
            </p> */}
        </div>
    </div>
);

// const ProductCard = ({ Name, Notes, Description, Picture }) => (
//     <Card>
//         <Card.Header as="h5">{Name}</Card.Header>
//     </Card>
// );

export default ProductCard;