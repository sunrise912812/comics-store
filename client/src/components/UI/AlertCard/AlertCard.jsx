import React from 'react'
import { observer } from 'mobx-react-lite'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE } from '../../../utils/consts'

const AlertCard = observer(({show, numberOrder})=>{
    const history = useNavigate()
    return(
        <Alert show={show} variant="success">
        <Alert.Heading>Уважаемый покупатель!</Alert.Heading>
        <p>
          Ваш заказ под №{numberOrder} успешно оформлен!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => history(MAIN_ROUTE)} variant="outline-success">
            Продолжить покупки
          </Button>
        </div>
      </Alert>
    )
})

export default AlertCard