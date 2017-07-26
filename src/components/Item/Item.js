import React, { Component } from 'react';

import './item.css';
import { itemImages } from './images';

import { ItemQuickView } from '../../components/QuickView/ItemQuickView';

export class Item extends Component {
    state = {
        viewModal: false
    };

    handleOpenModal = () => this.setState({ viewModal: true });

    handleCloseModal = (e) => this.setState({ viewModal: false });

    render (){
        return (
            <div className="item-wrapper">
                <div className="item-details">
                    <div className="item-image">
                        <img alt="product name" src={itemImages[Math.floor(Math.random() * itemImages.length)]}/>
                    </div>
                    <div className="item-info">
                        <div className="item-name">
                            <span className="item-name-label">Name: </span>
                            <span className="item-name-text text">{this.props.name}</span>
                        </div>
                        <div className="item-type">
                            <span className="item-type-label">Type: </span>
                            <span className="item-type-text text">{this.props.garmentType}</span>
                        </div>
                        <div className="item-price">
                            <span className="item-price-label">Price: </span>
                            <span className="item-price-text text">{this.props.price}</span>
                        </div>
                        <div className="item-alterations">
                            <span className="item-alterations-label">Alterations:</span>
                        </div>
                    </div>
                </div>
                <div className="item-actions">
                    <div
                        className="edit-item"
                        onTouchTap={this.handleOpenModal}
                    >
                        Edit
                    </div>
                    <div className="delete-item">
                        Delete Item
                    </div>
                </div>
                {this.state.viewModal &&
                    <ItemQuickView
                        viewModal
                        handleCloseModal={this.handleCloseModal}
                        {...this.props}
                    />
                }
            </div>
        );
    }
}
