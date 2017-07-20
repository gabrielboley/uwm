import React from "react";
import { Button } from "semantic-ui-react";

import './css/passcode.css';

export function PassCode({ onPasswordCardClick, onPasswordClear, onPasswordDelete }) {
    function buildButtonText(text, subText="") {
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
    return (
        <span>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={buildButtonText(1)}
                    onTouchTap={e => onPasswordCardClick(e, '1')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(2, 'A B C')}
                    onTouchTap={e => onPasswordCardClick(e, '2')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(3, 'D E F')}
                    onTouchTap={e => onPasswordCardClick(e, '3')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={buildButtonText(4, 'G H I')}
                    onTouchTap={e => onPasswordCardClick(e, '4')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(5, 'J K L')}
                    onTouchTap={e => onPasswordCardClick(e, '5')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(6, 'M N O')}
                    onTouchTap={e => onPasswordCardClick(e, '6')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={buildButtonText(7, 'P Q R S')}
                    onTouchTap={e => onPasswordCardClick(e, '7')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(8, 'T U V')}
                    onTouchTap={e => onPasswordCardClick(e, '8')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(9, 'W X Y Z')}
                    onTouchTap={e => onPasswordCardClick(e, '9')}
                />
            </Button.Group>
            <Button.Group
                fluid
                size="large"
                className="passcode-buttons"
            >
                <Button
                    className="passcode-button"
                    content={buildButtonText('clear')}
                    onTouchTap={onPasswordClear}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText(0)}
                    onTouchTap={e => onPasswordCardClick(e, '0')}
                />
                <Button
                    className="passcode-button"
                    content={buildButtonText('delete')}
                    onTouchTap={onPasswordDelete}
                />
            </Button.Group>
        </span>
    )
}
