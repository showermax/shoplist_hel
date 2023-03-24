import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {GoodsType, ShoppingListPropsType} from "../Typisation";

export const ShoppingList = (props: ShoppingListPropsType) => {
    const mappedGoods = props.goods.map((el, index) => {

        const changeGoodsStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeGoodsStatus(el.id, e.currentTarget.checked)
        }
        const expectedPriceToNumber = +el.expectedPrice.replace('$','')
        const realPriceToNumber = +el.realPrice.replace('$','')

        return (
            <li className={realPriceToNumber<=expectedPriceToNumber ? 'green': 'red'}>
                <div>
                    <button onClick={() => props.deleteGoods(el.id)}>x</button>
                    <b>{el.title}</b>
                </div>
                <div>expected price: {el.expectedPrice}</div>
                <div>real price: {el.realPrice}</div>
                <span>in cart: </span>
                <input type={'checkbox'} checked={el.inCart} onChange={changeGoodsStatusOnChangeHandler}/>
            </li>
        )
    })

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string> ('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }
    let res = 0
    const sum = props.goods.filter(el => el.inCart).map(el=> res += (+el.realPrice.replace('$', '')))

    const addGoodsOnClickHandler = () => {
        if (title.trim()) {
        props.addGoods(title)
        } else {setError('Name is required')}
        setTitle('')
    }
    const addGoodsOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.ctrlKey) {
          if (title.trim()) {
              props.addGoods(title)
          } else {setError('Name is required')}
          setTitle('')
      }
    }
    const objectForStyle ={
        color: 'red',
        background: "white"
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeInputHandler}
                       onKeyDown={addGoodsOnKeyDownHandler}
                       className={error ? 'red' : ''}

                />
                <button onClick={addGoodsOnClickHandler}
                        disabled={title.trim() === '' || title.length > 20}>
                    add
                </button>
               <div>{error}</div>
               {title.length>20 && <div>Use title with length shorter than 20 characters. Current length - {title.length}</div>}
            </div>
            <ul>
                {mappedGoods}
            </ul>

            <div>
                <button onClick={() => props.changeFilterValue("All")} style={{color: 'red', background: "white"}}>All</button>
                <button onClick={() => props.changeFilterValue("Not to buy")} style={objectForStyle}>Not to buy</button>
                <button onClick={() => props.changeFilterValue("Bought")}>Bought</button>
            </div>
        </div>
    )
}