import React, {useState} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import {FilterValue, GoodsType} from "./Typisation";
import {v1} from "uuid";

function App() {
    const [goods, setGoods] = useState<GoodsType[]>([
        {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
        {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
        {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
        {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    ])
    const [filter, setFilter] = useState<FilterValue>('All')

    const addGoods = (title: string) => {
        const randomPrice1=Math.floor(Math.random()*10+1)
        const randomPrice2=Math.floor(Math.random()*10+1)
        const addNewGoods = {id: v1(), title: title, expectedPrice: '$' +randomPrice1, realPrice: `$${randomPrice2}`, inCart: false}
        setGoods([...goods, addNewGoods])
    }

    const deleteGoods = (id: string) => {
        setGoods(goods.filter(el => el.id !== id))
    }

    const changeGoodsStatus = (goodsId: string, inChecked: boolean) => {
        setGoods(goods.map(el => el.id === goodsId ? {...el, inCart: inChecked} : el))
    }

    const changeFilterValue = (filter: FilterValue) => {
        setFilter(filter)
    }

    let filteredGoods: Array<GoodsType> = []
    if (filter === 'All') {
        filteredGoods = goods
    }
    if (filter === 'Not to buy') {
        filteredGoods = goods.filter(el => el.inCart !== true)
    }
    if (filter === 'Bought') {
        filteredGoods = goods.filter(el => el.inCart === true)
    }

    return (
        <div className="App">
            <ShoppingList
                title={"What to buy"}
                goods={filteredGoods}
                addGoods={addGoods}
                changeFilterValue={changeFilterValue}
                deleteGoods={deleteGoods}
                changeGoodsStatus={changeGoodsStatus}
            />
        </div>
    );
}

export default App;
