import React from 'react';
import { Button, Card, Icon, List } from 'semantic-ui-react';

import './confirmCustomer.css';

export const ConfirmCustomer = ({activeCustomer, onAddItemClick, onClearActiveUser }) => (
    <div
        style={{paddingLeft: '10px'}}
        className="active-customer-wrapper"
    >
        <Card
            fluid
            color="teal"
            key={activeCustomer.name}
        >
            <Card.Content>
                <Icon
                    name="close"
                    className="clear-active-customer"
                    onTouchTap={onClearActiveUser}
                />
                <Card.Header>{activeCustomer.name}</Card.Header>
                <Card.Description>
                    <List>
                        <List.Item icon="phone" content={activeCustomer.phone}/>
                        <List.Item icon="mail" content={activeCustomer.email}/>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
        <div className="step-button-wrapper">
            <Button
                size="huge"
                color="blue"
                content={`Create New Order for ${activeCustomer.name}`}
                className="next-step-button"
                onTouchTap={e => onAddItemClick(true, e)}
            />
        </div>
    </div>
)
