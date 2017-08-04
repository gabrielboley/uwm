import React, { PureComponent } from 'react';
import { Icon, Input } from 'semantic-ui-react';

export class EditField extends PureComponent {
    renderContent = () => {
        const {
            field,
            icon,
            needsValidation,
            onFieldFocus,
            onFieldUpdate,
            original,
            focus,
            wrapperClass,
            value,
            validation
        } = this.props;

        if (focus) {
            return (
                <div className={`${wrapperClass}-input field-input-wrapper`}>
                    <Input
                        fluid
                        value={value}
                        error={needsValidation && !validation}
                        onBlur={() => onFieldFocus(field)}
                        onChange={e => onFieldUpdate(field, e)}
                    />
                </div>
            );
        }

        const iconColor = () => {
            if (!needsValidation) {
                return original !== value && '#00aeef';
            }
            if (!validation) {
                return '#DB2828';
            }
            return original !== value && '#00aeef';
        }

        const renderValue = () => {
            if (field === 'password') {
                return '****';
            }
            return value;
        }
        return (
            <div
                className={`${wrapperClass} field-input`}
                onTouchTap={() => onFieldFocus(field)}
            >
                <Icon
                    name={icon}
                    style={{
                        color: iconColor(),
                        marginLeft: '-25px',
                        marginRight: '6px'
                    }}
                />
                <span>
                    {renderValue()}
                </span>
            </div>
        );
    }
    render () {
        return this.renderContent();
    }
}
