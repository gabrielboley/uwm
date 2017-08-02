import _ from 'lodash'
import React, { Component } from 'react';
import { Divider, Form, Icon, Grid, Loader, Radio, Search, TextArea } from 'semantic-ui-react';

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
            images: [],
            isLoading: false,
            item: null,
            imagePreviewUrl: [],
            results: [],
            notes: '',
            value: ""
        };
    }

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleImageChange = (e) => {
        e.preventDefault();
        const { index } = this.props;
        const { images, imagePreviewUrl, item } = this.state;
        const newImages = e.target.files;

        Object.keys(newImages).forEach(img => {
            const reader = new FileReader();
            images.push(newImages[img]);

            reader.onloadend = () => {
                imagePreviewUrl.push(reader.result);
                this.setState({
                    images,
                    imagePreviewUrl
                });
            }

            reader.readAsDataURL(newImages[img]);
        });
        document.getElementById(`file-${index}`).value = '';
        item.images = imagePreviewUrl;
        this.props.handleAddItem(item, index);
    }

    handleRemoveImage = (e, imageToRemove, urlToRemove) => {
        e.preventDefault();
        e.stopPropagation();
        const { index } = this.props;
        const { images, imagePreviewUrl, item } = this.state;
        const newImages = images.filter(image => (image !== imageToRemove));
        const newImageUrls = imagePreviewUrl.filter(url => (url !== urlToRemove));

        this.setState({
            images: newImages,
            imagePreviewUrl: newImageUrls
        });
        item.images = newImageUrls;
        this.props.handleAddItem(item, index);
    }

    handleResultSelect = (e, item, index) => {
        this.props.handleAddItem(item.result, index);
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

    handleNotes = (e, { value }) => {
        const { index } = this.props;
        const { item } = this.state;

        item.notes = value;
        this.props.handleAddItem(item, index);
    };

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

    renderDivider = () => {
        const { isFirst } = this.props;
        if (isFirst) {
            return null;
        }
        return <Divider />;
    }

    renderDeleteButton = () => {
        const { isFirst, index } = this.props;
        if (isFirst) {
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

    renderImages = () => {
        const { images, imagePreviewUrl } = this.state;

        if (!images.length) {
            return null;
        }

        const style = {
            img: {
                maxHeight: '100%',
                maxWidth: '70px'
            },
            imgContainer: {
                float: 'left',
                marginRight: '10px',
                width: '70px'
            }
        };
        console.log('images', images); // eslint-disable-line no-console
        return (
            <Grid.Column width={16}>
                {images.map((image, index) => (
                    <div
                        key={`${image.name}`}
                        style={style.imgContainer}
                        onTouchTap={e => this.handleRemoveImage(e, image, imagePreviewUrl[index])}
                        className="image-preview-wrapper"
                    >
                        {imagePreviewUrl[index]
                            ? (
                                <img
                                    alt={image.name}
                                    style={style.img}
                                    src={imagePreviewUrl[index]}
                                />
                            )
                            : <Loader active inline />
                        }
                    </div>
                ))}
            </Grid.Column>
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
        const { index, shipOrPickupAll } = this.props;
        const { isLoading, value, results, item } = this.state;

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
                                    onResultSelect={(e, item) => this.handleResultSelect(e, item, index)}
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
                            {!shipOrPickupAll && [
                                <Form.Group key={`shipping-${index}`}>
                                    {this.renderShipping()}
                                </Form.Group>,
                                <Form.Group key={`pickup-${index}`}>
                                    {this.renderPickupDate()}
                                </Form.Group>
                            ]}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Form.Group className="note-wrapper">
                                <TextArea
                                    placeholder="Notes"
                                    onChange={this.handleNotes}
                                />
                                <Form.Input
                                    multiple
                                    type="file"
                                    id={`file-${index}`}
                                    placeholder="Add Photo"
                                    onChange={(e) => this.handleImageChange(e)}
                                    className={`photo-upload ${item ? '' : 'disabled'}`}
                                />
                            </Form.Group>
                        </Grid.Column>
                    {this.renderImages()}
                    </Grid>
                </Form>
            </div>
        );
    }
}
