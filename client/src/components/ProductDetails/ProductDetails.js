import React, { Component } from 'react'
import Reviews from '../ProductDetails/Reviews/Reviews'
import Info from './Info/Info'
import Images from './Image/Images'
import RelatedItems from './RelatedItems/RelatedItems'

import { getProduct, deleteProduct } from '../../services/products'
import { withRouter, Link } from 'react-router-dom'

// const data = require('../../products.json')

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: null,
      items: [],
    }
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    const product = await getProduct(id)
    this.setState({ product })

  }


  render() {
    const { product } = this.state
    console.log(this.state)
    if (!product) {
      return null
    } else {
      return (
        <div className="detail-container">
          <div className="prodColumn">
            <Images images={this.state.product.images} altText={this.state.product.name} />
            <Reviews />
          </div>
          <div className="prodColumn">
            <Info product={this.state.product} />
            <RelatedItems items={this.state.product} />
          </div>
        </div>
      )
    }
  }
}





export default withRouter(ProductDetails)