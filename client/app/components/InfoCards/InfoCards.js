import React from 'react';
import { Card } from 'antd';

export default function InfoCards(props) {
    
    return (
        <div className='cardsContainer'>
            <Card
                title='Account Number'
                style={{width: 300, borderColor: 'darkgray'}}
            >
                <div className='currentAmount'>{props.accountNumber}</div>
            </Card>
            <Card
                title='Total Amount'
                style={{width: 300, borderColor: 'darkgray'}}
            >
                <div className='currentAmount'>₹{props.totalAmount}</div>
            </Card>
            <Card
                title='Interest Applied'
                style={{width: 300, borderColor: 'darkgray'}}
            >
                <div className='currentAmount'>1.5%</div>
            </Card>
        </div>
    )
}