import Infinite from 'react-infinite';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Card, Checkbox, Divider, Input, Icon, List, TextArea } from 'semantic-ui-react';

import './products.css';
import { addNewProduct, deleteProduct } from './products.actions';

class Products extends Component {
    state = {
        addNew: false,
        product: null,
        newProduct: {
            name: '',
            garmentType: '',
            price: '',
            quantity: '',
            alter: true,
            shipped: true,
            notes: ''
        }
    }

    onAddNewProduct = () => this.setState({ addNew: true });

    onEditProduct = product => this.setState({ addNew: true, product});

    onSaveNewProduct = () => {
        this.setState({ addNew: false });
        this.props.dispatch(addNewProduct(this.state.newProduct));
    }

    onDeleteProduct = productId => this.props.dispatch(deleteProduct(productId));

    renderAddNew = () => {
        const { newProduct } = this.state;

        const updateProduct = (e, { value, name, checked }) => {
            newProduct[name] = typeof checked !== 'undefined' ? checked : value;
            this.setState({ newProduct });
        };
        return (
            <div className="wrapper">
                <Card
                    fluid
                    color="blue"
                    header="Add New Product"
                    className="add-new-product-card"
                    extra={
                        <div className="add-new-wrapper">
                            <Input
                                fluid
                                name="name"
                                label="Name"
                                type="text"
                                value={newProduct.name}
                                onChange={updateProduct}
                            />
                            <Input
                                fluid
                                type="text"
                                label="Type"
                                name="garmentType"
                                value={newProduct.type}
                                onChange={updateProduct}
                            />
                            <Input
                                fluid
                                name="price"
                                label="Price"
                                type="number"
                                value={newProduct.price}
                                onChange={updateProduct}
                            />
                            <Input
                                fluid
                                name="quantity"
                                label="Quantity"
                                type="number"
                                onChange={updateProduct}
                                value={newProduct.quantity}
                            />
                            <Checkbox
                                toggle
                                name="alter"
                                label="Can Be Altered"
                                onChange={updateProduct}
                                checked={newProduct.alter}
                            />
                            <Checkbox
                                toggle
                                name="shipped"
                                label="Can Be Shipped"
                                onChange={updateProduct}
                                checked={newProduct.shipped}
                            />
                            <TextArea
                                name="notes"
                                placeholder='Notes'
                                value={newProduct.notes}
                                onChange={updateProduct}
                            />
                        </div>
                    }
                />
                <Button
                    fluid
                    primary
                    content="Save Product"
                    className="add-new-product-confirm"
                    onTouchTap={this.onSaveNewProduct}
                />
            </div>
        );
    }

    renderProducts = () => {
        const { products } = this.props;
        return products.map(product => (
            <Card
                fluid
                color="blue"
                key={product.id}
                className="product-card"
                meta={product.garmentType}
                header={[
                    product.name,
                    <div
                        className="quantity-label"
                        key={`qty-${product.id}`}
                    >
                        Qty. {' '}{product.quantity}
                    </div>
                ]}
                extra={
                    <div className="product-content-wrapper">
                        <List
                            divided
                            relaxed
                            floated="left"
                            className="product-details"
                        >
                            <List.Item
                                content={
                                    <div className="label">
                                        Price:
                                        <span className="content">{product.price}</span>
                                    </div>
                                }
                            />
                            <List.Item
                                content={
                                    <div className="label">
                                        Can Be Altered:
                                        <span className="content">
                                        <Icon
                                            inverted
                                            circular
                                            size="tiny"
                                            name="check"
                                            color={product.canBeAltered ? 'blue' : 'grey'}
                                        />
                                    </span>
                                    </div>
                                }
                            />
                            <List.Item
                                content={
                                    <div className="label">
                                        Can Be Shipped:
                                        <span className="content">
                                        <Icon
                                            inverted
                                            circular
                                            size="tiny"
                                            name="check"
                                            color={product.canBeShipped ? 'blue' : 'grey'}
                                        />
                                    </span>
                                    </div>
                                }
                            />
                        </List>
                        <Divider/>
                        <div className="ui two buttons">
                            <Button
                                basic
                                color="blue"
                                onTouchTap={() => this.onEditProduct(product)}
                            >
                                Edit
                            </Button>
                            <Button
                                basic
                                color="red"
                                onTouchTap={() => this.onDeleteProduct(product.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                }
            />
        ))
    }

    render () {
        if (this.state.addNew) {
            return this.renderAddNew();
        }
        return (
            <div className="products-wrapper">
                <Card.Group
                    stackable
                    itemsPerRow={1}
                >
                    <Infinite
                        elementHeight={45}
                        className="product-list-wrapper"
                        containerHeight={window.innerHeight}
                        infiniteLoadingBeginBottomOffset={1000}
                    >
                        {this.renderProducts()}
                    </Infinite>
                </Card.Group>
                <Button
                    fluid
                    primary
                    content="Add New Product"
                    className="add-new-product"
                    onTouchTap={this.onAddNewProduct}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
}

export default connect(mapStateToProps)(Products);
