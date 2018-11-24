import React from 'react';
import { Card } from 'antd';

export default function InfoCards() {
    return (
        <div className='cardsContainer'>
            <Card
                title='Account Number'
                style={{width: 300, borderColor: 'darkgray'}}
            >
                <div className='currentAmount'>12345</div>
            </Card>
            <Card
                title='Total Amount'
                style={{width: 300, borderColor: 'darkgray'}}
            >
                <div className='currentAmount'>₹4000</div>
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