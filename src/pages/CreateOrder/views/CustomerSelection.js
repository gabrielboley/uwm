import React from 'react';

export const CustomerType = ({onNewUserClick, onCustomerSelectClick, onGuestOption}) => (
    <div className="customer-type-group">
        <div
            className="new-customer"
            onTouchTap={e => onNewUserClick(e)}
        >
            <p>New Customer</p>
            <img
                alt="use an existing user"
                className="create-user-svg"
                src="/images/svg/create_user.svg"
            />
        </div>
        <div
            className="existing-customer"
            onTouchTap={e => onCustomerSelectClick(e)}
        >
            <p>Existing Customer</p>
            <img
                alt="create a new user"
                className="create-user-svg"
                src="/images/svg/existing_users.svg"
            />
        </div>
        <div
            className="guest-button"
            onTouchTap={e => onGuestOption(e)}
        >
            <p>Guest</p>
        </div>
    </div>
)
