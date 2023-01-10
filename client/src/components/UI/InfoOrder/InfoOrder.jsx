import React from 'react'
import { observer } from 'mobx-react-lite'
import classes from './InfoOrder.module.css'

const InfoOrder = observer(({info})=>{
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    return(
        <div>
            <h5 style={{ color : '#000', fontSize: '15px', fontWeight : 700, marginBottom : '20px' }}>Информация о заказе:</h5>
            {
                info.filter(i=>i.title !== 'Статус').map((i)=>{
                    return(
                        <div key={i.id} className={classes.MyInfoOrder}>
                            <div className={classes.MyInfoOrderTitle}>{i.title}</div>
                            <div className={classes.MyInfoOrderDescription}>{i.description}</div>
                        </div>
                        
                    )
                })
            }
            <h5 style={{ color : '#000', fontSize: '15px', fontWeight : 700, marginBottom : '20px', marginTop : '30px' }}>История заказа:</h5>
            {
                info.filter(i=>i.title === 'Статус').map((i)=>{
                    return(
                        <div key={i.id} className={classes.MyHistoryOrder}>
                            <div className={classes.MyHistoryOrderTitle}>{getMyDateCard(i.dateCreate)}</div>
                            <div className={classes.MyHistoryOrderDescription}>{i.description}</div>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default InfoOrder