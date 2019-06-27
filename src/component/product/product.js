import React, { Component } from 'react';
import ProductCard from './productcard';

import './product.css';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      products: [],
      offset: ""
    };

    this.getData = this.getData.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidMount() {
    this.getData(null,null);
  }

  handleChange = event => {
    
    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      this.getData(this.state.offset, this.state.searchText);
    });
    
  }

  getData = (offset, searchText) => {
    
    if (offset !== null && offset !== undefined) {
      this.pageSize += 4;
    } else {
      this.pageSize = 4;
    }

    if(searchText !== null && searchText !== "" && searchText !== undefined) {
      this.filter = '&filterByFormula=(FIND("'+searchText+'",{Name}))';
      this.pageSize = 100;
    } else {
      this.filter = '';
    }

    fetch('https://api.airtable.com/v0/appzeUDpZOqRjLPaJ/Furniture?pageSize=' + this.pageSize + this.filter + '&api_key=keyBASfn0tbP5woCx')
      .then((resp) => resp.json())
      .then(data => {
        this.setState({
          products: data.records,
          offset: data.offset
        });
      }).catch(err => {
        console.log(err);
      });
  }

  sendEmail = (product, e) => {
    console.log(product);
    console.log(e);
  }

  render() {
    return (
      <div className="container">
        <input
          id="searchText"
          type="text"
          value={this.state.searchText}
          onChange={this.handleChange}
          placeholder="Search"
        />

        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.products.map(
                product =>
                  <div>
                    <ProductCard {...product.fields} />
                    {/* <button
                      onClick={(e) => this.sendEmail(product, e)}
                    >
                      Send Email
                  </button> */}
                  </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => this.getData(this.state.offset, this.state.searchText)}
        >
          Show More
        </button>
      </div>
    );
  }
}

export default Product;