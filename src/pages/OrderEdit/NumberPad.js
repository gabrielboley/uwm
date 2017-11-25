import React, { Component } from 'react';
import { Button } from "semantic-ui-react";

import '../Login/css/passcode.css';

export class NumberPad extends Component {
    buildButtonText = (text, subText) => {
        return (
            <div className="button-wrapper">
                <div className="button-text">{text}</div>
                {subText &&
                    <div className="button-sub-text-wrapper">
                        <div className="button-sub-text">{subText}</div>
                    </div>
                }
            </div>
        )
    }

    render() {
        const { onNumberDelete, onNumberClear, onNumberClick } = this.props;
        return (
            <span>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(1)}
                    onTouchTap={e => onNumberClick(e, '1')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(2, 'A B C')}
                    onTouchTap={e => onNumberClick(e, '2')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(3, 'D E F')}
                    onTouchTap={e => onNumberClick(e, '3')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(4, 'G H I')}
                    onTouchTap={e => onNumberClick(e, '4')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(5, 'J K L')}
                    onTouchTap={e => onNumberClick(e, '5')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(6, 'M N O')}
                    onTouchTap={e => onNumberClick(e, '6')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(7, 'P Q R S')}
                    onTouchTap={e => onNumberClick(e, '7')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(8, 'T U V')}
                    onTouchTap={e => onNumberClick(e, '8')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(9, 'W X Y Z')}
                    onTouchTap={e => onNumberClick(e, '9')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={this.buildButtonText('clear')}
                    onTouchTap={onNumberClear}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText(0)}
                    onTouchTap={e => onNumberClick(e, '0')}
                />
                <Button
                    className="passcode-button"
                    content={this.buildButtonText('delete')}
                    onTouchTap={onNumberDelete}
                />
            </Button.Group>
        </span>
        )
    }
}
