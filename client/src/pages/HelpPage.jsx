import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Row, Col } from 'react-bootstrap'
import classes from './styles/HelpPage.module.css'

const HeplPage = observer(()=>{
    const [questions, setQuestions] = useState([])
useEffect(()=>{
    setQuestions([{id : 1, title : 'Способы доставки?', description : '<ul><li>Доставка в пункт выдачи</li><li>Адресная доставка</li></ul>', visible : false},{id : 2, title : 'Какие документы прилагаются к заказам?', description : 'В заказ вкладываются накладная и акт выполненных работ (при платной доставке). Счет-фактура будет предоставлена в электронном виде.'},{id : 3, title : 'Порядок выдачи заказа', description : 'При получении заказа юридическому лицу необходимо предъявить <strong>оригинал доверенности.</strong>'},{id : 4, title : 'Условия возврата товара', description : 'Возврат по желанию клиента — это возврат товара, который удовлетворяет качеству, соответствует заявленным характеристикам, но может быть возвращен по субъективным причинам (например: не понравился цвет, фасон, размер и др).'}, {id : 5, title : 'Как оставить отзыв на товар?', description : `Чтобы оставить отзыв на товар: <ul><li>Перейдите на страницу товара.</li><li>Нажмите кнопку "Оставить отзыв", она расположена внизу страницы.</li><li>Выберите количество звезд (от 1 до 5) и напишите текст отзыва.</li><li>Подтвердите действие нажатием кнопки "Оставить отзыв".</li>
    <li>После этого ваш отзыв будет добавлен на страницу товара.</li></ul>`}])
},[])
function funcVisible(id){
    setQuestions(questions.map((q)=>q.id === id ? {...q, visible : !q.visible} : q))
}
    return(
        <Container>
            <Row>
                <Col md={12} className="mt-3 mb-5">
                    <h3 className={classes.MyQuestionsHeader}>Часто задаваемые вопросы</h3>
                    <div className={classes.MyQuestions}>
                        {
                            questions.map((q)=>{
                                return(
                                    <div key={q.id} className={classes.MyQuestionsItem}>
                                        <h5 onClick={()=>funcVisible(q.id)} className={classes.MyQuestionsItemHeader}><div className={classes.MyQuestionsItemHeaderPlus}>+</div>{q.title}</h5>
                                        <p className={q.visible ? classes.MyQuestionsItemContent : classes.MyQuestionsItemContentNot} dangerouslySetInnerHTML={{__html: q.description}}></p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default HeplPage