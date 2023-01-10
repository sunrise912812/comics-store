import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'react-bootstrap'
import { Context } from '../../../index'
import cardStar from '../../../assets/star.png'
import classes from '../../../pages/styles/ComicOnePage.module.css'

const CardReviewAdd = observer(({comic, showmodal})=>{
    const {user} = useContext(Context)
    const procentOcenka = (comic.raiting / 5) * 100
    return(
        <div>
            <Card className={classes.MyCardReviewAdd}>
                <div className={classes.MyCardReviewAddRaiting}>
                    <div className={classes.MyCardReviewRaitingOcenka}>
                        <div>{comic.raiting}</div>
                        <div className={classes.MyCardReviewRaitingOcenkaImg} style={{ backgroundImage : `url(${cardStar})` }}></div>
                    </div>
                    <div className={classes.MyCardReviewRaitingProcent}>
                        <div className={classes.MyCardReviewRaitingProcentFull}>
                            <div className={classes.MyCardReviewRaitingProcentMain} style={{ width : `${procentOcenka}%` }}>
                            </div>
                        </div>
                    </div>
                    <div className={classes.MyCardReviewAddCount}>
                        <span>{comic.comment.length} отзывов</span>
                    </div>
                </div>
                <Button variant="warning" onClick={()=>showmodal(true)} disabled={!user.isAuth ? true : false}>Оставить отзыв</Button>
            </Card>
        </div>
    )
})

export default CardReviewAdd