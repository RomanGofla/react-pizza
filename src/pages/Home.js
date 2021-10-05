import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';

import { fetchPizzas } from '../redux/actions/pizzas'

import { setCategory, setSortBy } from '../redux/actions/filters'

const categoryNames = ['мясные', 'веганские', 'гриль', 'Острые', 'Закрытые']
const sortItems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({ pizzas }) => pizzas.items)
    const cartItems = useSelector(({ cart }) => cart.items)
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
    const { category, sortBy } = useSelector(({ filters }) => filters)

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy, dispatch])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, [dispatch])

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, [dispatch])

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: 'ADD_PIZZA_CART',
            payload: obj,
        })
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortItems}
                    onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                        <PizzaBlock
                            onClickAddPizza={handleAddPizzaToCart}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
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
