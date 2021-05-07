import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Message = forwardRef(({message, user}, ref) => {

    const isUser = user === message.user
    return (
        <div ref={ref} className={`message ${isUser && 'message-user'}`}>
            <Card className={isUser ? 'message-userCard' : 'message-guestCard'}>
                <CardContent>
                    <h2 className="message-user">
                        {!isUser && `${message.user || 'Unkown User'}`}
                    </h2>
                   <p className="message-text">
                        {message.text}
                   </p>
                </CardContent>
            </Card>
        </div>
            
    );
})

export default Message;
