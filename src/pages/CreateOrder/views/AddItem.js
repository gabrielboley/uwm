import _ from 'lodash'
import React, { Component } from 'react';
import { Divider, Form, Icon, Grid, Radio, Search, TextArea } from 'semantic-ui-react';

import './addItem.css';
import { months, days } from '../../../consts/dates';

class Input extends Component {
    render() {
        const { value, placeholder } = this.props;
        const inputValue = value ? value : '';
        return (
            <div className="ui input">
                <input
                    type="text"
                    value={inputValue}
                    placeholder={placeholder}
                    className="item-type-input"
                />
            </div>
        );
    }
};

export class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: '1',
            isLoading: false,
            item: null,
            results: [],
            value: ""
        };
    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, item) => {
        this.props.handleAddItem(item.result);
        this.setState({
            item: item.result,
            value: item.result.name
        });
    }

    handleSearchChange = (e, value) => {
        this.setState({ isLoading: true, value: value.value });

        setTimeout(() => {
            if (this.state.value.length < 1) {
                return this.resetComponent();
            }

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.name)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.products, isMatch)
            })
        }, 500);
    }

    handleDeliveryChange =(e, { value }) => this.setState({ delivery: value });

    renderResults = (result) => (
        <div
            key={result.name}
            className="result-wrapper"
        >
            {result.name}
        </div>
    )

    renderPlaceholder = (input) => {
        const { item } = this.state;
        if (!item) {
            return '';
        }
        return item[input];
    }

    renderAlterationInput = () => {
        const { item } = this.state;
        if (!item) {
            return <Form.Input disabled width={16} placeholder="Alterations" />;
        }
        const { canBeAltered } = item;
        return (
            <Form.Input
                width={16}
                disabled={!canBeAltered}
                placeholder={canBeAltered ? 'Alterations' : 'Can not be altered.'}
            />
        );
    }

    // renderAddItemButton = () => {
    //     const { item } = this.state;
    //     if (!item) {
    //          return null;
    //     }
    //     return (
    //         <div className="add-item-button-wrapper">
    //             <Button
    //                 size="huge"
    //                 content="Add Another"
    //                 className="add-another"
    //                 onTouchTap={this.props.onAnotherItem}
    //             />
    //             <Button
    //                 size="huge"
    //                 primary
    //                 icon="arrow right"
    //                 content="Add Item"
    //                 className="add-item-button"
    //                 onTouchTap={this.props.onToReviewItems}
    //             />
    //         </div>
    //     )
    // }

    renderDivider = () => {
        const { index } = this.props;
        if (index === 0) {
            return null;
        }
        return <Divider />;
    }

    renderDeleteButton = () => {
        const { index } = this.props;
        if (index === 0) {
            return null;
        }
        const styles = {
            width: '100%',
            textAlign: 'right'
        }
        return (
            <div
                style={styles}
                className="item-actions-header"
            >
                <Icon
                    color="red"
                    size="large"
                    name="window close"
                    onTouchTap={() => this.props.handleRemoveItem(index)}
                />
            </div>
        );
    }

    renderPickupDate = () => {
        const { delivery } = this.state;
        if (delivery === '1') {
            return null;
        }

        return (
            <Form.Field
                inline
                width={16}
                className="date-picker"
            >
                <Form.Select
                    width={8}
                    options={months}
                    className="month"
                    placeholder='Month'
                />
                <Form.Select
                    width={8}
                    options={days}
                    className="day"
                    placeholder='Day'
                />
            </Form.Field>
        )
    }

    renderShipping = () => {
        const { delivery, item } = this.state;
        if (!item) {
            return (
                <Form.Group className="delivery" inline>
                    <Form.Field control={Radio} label="Shipped" disabled/>
                    <Form.Field control={Radio} label="Pickup" disabled/>
                </Form.Group>
            );
        }

        return (
            <Form.Group className="delivery" inline>
                <Form.Field
                    value="1"
                    label="Shipped"
                    control={Radio}
                    checked={delivery === '1'}
                    onChange={this.handleDeliveryChange}
                />
                <Form.Field
                    value="2"
                    label="Pickup"
                    control={Radio}
                    checked={delivery === '2'}
                    onChange={this.handleDeliveryChange}
                />
            </Form.Group>
        );
    }

    render (){
        const { isLoading, value, results } = this.state;

        return (
            <div className="add-item-container">
                {this.renderDivider()}
                {this.renderDeleteButton()}
                <Form className="add-item-wrapper">
                    <Grid stackable>
                        <Grid.Column width={10}>
                            <Form.Group>
                                <Form.Input
                                    value={value}
                                    control={Search}
                                    results={results}
                                    loading={isLoading}
                                    placeholder='Item Name'
                                    className="sixteen wide field"
                                    resultRenderer={this.renderResults}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={this.handleSearchChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    width={8}
                                    control={Input}
                                    placeholder="Item Type"
                                    value={this.renderPlaceholder('garmentType')}
                                />
                                <Form.Input
                                    width={8}
                                    control={Input}
                                    placeholder="Price"
                                    value={this.renderPlaceholder('price')}
                                />
                            </Form.Group>
                            <Form.Group>
                                {this.renderAlterationInput()}
                            </Form.Group>
                            <Form.Group>
                                {this.renderShipping()}
                            </Form.Group>
                            <Form.Group>
                                {this.renderPickupDate()}
                            </Form.Group>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Form.Group className="note-wrapper">
                                <TextArea placeholder="Notes" />
                                <Form.Input
                                    type="file"
                                    placeholder="Add Photo"
                                    className="photo-upload"
                                />
                            </Form.Group>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }
}
