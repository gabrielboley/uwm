import React from 'react';
import { Card } from 'semantic-ui-react';

export function Users({ users, onUserCardClick }) {
    const cards = users.map(user => (
        <Card
            key={user.username}
            header={user.name}
            meta={user.username}
            className="user-group-card"
            onClick={e => onUserCardClick(e, user)}
            image={`/images/avatar/large/${user.avatar}`}
        />
    ))
    return (
        <Card.Group
            doubling
            itemsPerRow={3}
            className="user-group"
        >
            {cards}
        </Card.Group>
    );
}
