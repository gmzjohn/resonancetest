import React from 'react';


// const ProductCard = ({ Name, Notes, Description, Picture }) => (
//     <div className="card r-card-img">
//         <img className="card-img-top" src={Picture[0].url} alt="Movie poster" />
//         <div className="card-body">
//             <h5 className="card-title">{Name}</h5>
//             {/* <p className="card-text">{Description}</p> */}
//             {/* <p className="card-text">
//                 <small className="text-muted">{Notes}</small>
//             </p> */}
//         </div>
//     </div>
// );
function sendEmail(description, e) {
    console.log(description);
    console.log(e);
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
            Send Email
        </button>
    </div>
);

export default ProductCard;