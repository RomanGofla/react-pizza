import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from '../components';

import { fetchPizzas } from '../redux/actions/pizzas'

import { setCategory } from '../redux/actions/filters'

const categoryNames = ['мясные', 'веганские', 'гриль', 'Острые', 'Закрытые']
const sortItems = [
    {name: 'популярности', type: 'popular'},
    {name: 'цене', type: 'price'}, 
    {name: 'алфавиту', type: 'alphabet'}
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({pizzas}) => pizzas.items)
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)

    React.useEffect(() => {
        dispatch(fetchPizzas())
    }, [])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClick={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup
                    items={sortItems}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded 
                    ? items.map((obj) => (
                        <PizzaBlock 
                            key={obj.id} 
                            {...obj}
                        />
                    ))
                    : Array(12)
                        .fill(0)
                        .map((_, index) => <PizzaLoadingBlock key={index} />)}
                           
            </div>
        </div>
    )
}

export default Home
