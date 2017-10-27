import React, { PureComponent } from 'react';
import { Header, Input, List } from 'semantic-ui-react'

export class CustomerEdit extends PureComponent {
    render() {
        const {
            name,
            phone,
            email,
            street1,
            street2,
            city,
            state,
            updateCustomerInfo
        } = this.props;
        return (
            <div>
                <Header>
                    <Input icon='user' iconPosition='left' name='name' onChange={(e) => updateCustomerInfo(e, 'name')} size='small' type='text' value={name}/>
                </Header>
                <List>
                    <List.Item>
                        <Input icon='phone' iconPosition='left' name='phone' onChange={(e) => updateCustomerInfo(e, 'phone')} size='small' type='text' value={phone}/>
                    </List.Item>
                    <List.Item>
                        <Input icon='mail' iconPosition='left' name='email' onChange={(e) => updateCustomerInfo(e, 'email')} size='small' type='text' value={email}/>
                    </List.Item>
                    <List.Item>
                        <Input name='street1' size='small' onChange={(e) => updateCustomerInfo(e, 'street1')} type='text' value={street1}/>
                        { street2 
                            && (
                                <Input name='street2' size='small' onChange={(e) => updateCustomerInfo(e, 'street2')} type='text' value={street2}/>
                            )
                        }
                    </List.Item>
                    <List.Item>
                        <Input name='city' size='small' onChange={(e) => updateCustomerInfo(e, 'city')} type='text' value={city}/>, 
                        <Input name='state' size='small' onChange={(e) => updateCustomerInfo(e, 'state')} type='text' value={state}/>
                    </List.Item>
                </List>
            </div>
        );
    }
}