import React, { Component } from 'react';
import ProductCard from './productcard';

import './product.css';

class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.getData = this.getData.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch('https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/Furniture?api_key=keyBASfn0tbP5woCx')
      .then((resp) => resp.json())
      .then(data => {
        this.setState({ products: data.records });
      }).catch(err => {
        console.log(err);
      });
  }

  sendEmail = (product, e) => {

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'resonancecompanytest@gmail.com',
        pass: 'Letmein123***'
      }
    });

    var mailOptions = {
      from: 'resonancecompanytest@gmail.com',
      to: 'gmzjohn7@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.products.map(
                product =>
                  <div>
                    <ProductCard {...product.fields} />
                    <button
                      onClick={(e) => this.sendEmail(product, e)}
                    >
                      Send Email
                  </button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;