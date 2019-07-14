import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      name: "",
      amount: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({
      name: this.state.name
    });
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!");
  }

  async handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:3000/charge";

    let { token } = await this.props.stripe.createToken({
      name: this.state.name
    });
    let amount = this.state.amount;

    await axios({
      method: "POST",
      mode: "no-cors",
      url: url,
      config: {
        header: {
          "content-type": "application/json"
        }
      },
      data: {
        token: token,
        amount: amount
      }
    });

    // try {
    //   let { token } = await this.props.stripe.createToken({
    //     name: this.state.name
    //   });
    //   let amount = this.state.amount;

    //   await fetch(baseurl + "/charge", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ token, amount })
    //   });

    //   console.log(token, amount);
    // } catch (err) {
    //   throw err;
    // }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      //   <main className="container">
      //     <form className="form-group mt-3 border border-primary rounded shadow-lg">
      //       <label>name</label>
      //       <input
      //         type="text"
      //         className="input-group my-1 p-1 border border-dark"
      //         value={this.state.name}
      //         onChange={e => this.setState({ name: e.target.value })}
      //       />

      //       <label>amount</label>
      //       <input
      //         type="text"
      //         className="input-group my-1 p-1 border border-dark"
      //         value={this.state.amount}
      //         onChange={e => this.setState({ amount: e.target.value })}
      //       />

      //       <CardElement />

      //       <button onClick={this.handleSubmit}>Charge</button>
      //     </form>
      //   </main>

      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <label>image</label>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <CardElement />
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
