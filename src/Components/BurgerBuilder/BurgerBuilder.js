import React, {Component} from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap';

import {connect} from 'react-redux';
import{addIngredient, removeIngredient, updatePurchasable} from '../../redux/actionCreators';

const mapStateToProps = state =>{
  return{
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchasable: () => dispatch(updatePurchasable()),
  }
}

// const INGREDIENT_PRICES = {
//   salad: 20,
//   cheese: 40,
//   meat: 90,
// }

// export default class BurgerBuilder extends Component{
class BurgerBuilder extends Component{
  state = {
    // ingredients: [
    //   {type: 'salad', amount: 0},
    //   {type: 'cheese', amount: 0},
    //   {type: 'meat', amount: 0}
    // ],
    // totalPrice: 80,
    modalOpen: false,
    // purchasable: false,
  }

  // updatePurchasable = ingredients =>{
  //   const sum = ingredients.reduce((sum, element) =>{
  //     return sum + element.amount;
  //   },0);
  //   this.setState({purchasable: sum > 0});
  // }

  addIngredientHandle = type =>{
    // console.log("addIngredientHandle: ",type);
    
    this.props.addIngredient(type);
    this.props.updatePurchasable();
    // this.updatePurchasable(ingredients);
  }

  removeIngredientHandle = type =>{
    // console.log("removeIngredientHandle: ",type);
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
  }

  toggleModal = () =>{
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  handleCheckout = () =>{
    this.props.history.push("/checkout");
  }
  

  render(){
    return(
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls 
            ingredientAdded={this.addIngredientHandle} 
            ingredientRemoved={this.removeIngredientHandle} 
            price={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable} 
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary:</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
            <Summary ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button style={{backgroundColor: "#D70F64"}} onClick={this.handleCheckout} >Continue to Checkout</Button>
            <Button color="secondary" onClick={this.toggleModal} >Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);