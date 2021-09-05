import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages'
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';
import {connect} from 'react-redux'
import React from 'react'
import axios from 'axios';
//   import store from './redux/store';




// function App() {
//   const [pizzas, setPizzas] = React.useState([])

//   React.useEffect(() => {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => {
//       setPizzas(data.pizzas)
//     })
//   }, [])

//   return (
//     <div className="wrapper">
//       <Header />
//       <div className="content">
//         <Route path='/' render={() => <Home items={pizzas} />} exact />
//         <Route path='/cart' component={Cart} exact />
//       </div>
//     </div>
//   );
// }

class App extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      this.props.setPizzas(data.pizzas)
    })
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path='/' render={() => <Home items={this.props.items} />} exact />
          <Route path='/cart' component={Cart} exact />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.pizzas.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPizzas: (items) => dispatch(setPizzasAction(items)),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
