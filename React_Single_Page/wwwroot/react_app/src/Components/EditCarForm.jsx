import React, { Component } from "react";
import axios from 'axios';
import App from '../App';

const url = "http://localhost:50291/api/CarAPI/";

class EditCarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oneCar: this.props.oneCar,
            editComplete: false,

            modelName: this.props.oneCar.modelName,
            brand: this.props.oneCar.brand,
            color: this.props.oneCar.color,
            productionYear: this.props.oneCar.productionYear

        };
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { modelName, brand, color, productionYear } = this.state

        const car = {
            ModelName: modelName,
            Brand: brand,
            Color: color,
            ProductionYear: productionYear
        };
        console.log(car);
        axios.put(url, [this.state.oneCar.id, car], { "Content-Type": "application/json" })
            .then(response => {
                console.log(response);
                this.setState({ editComplete: true })
            })
            .catch(status => {
                console.log(status);
            })
    }

    //Continue here.
    render() {

        if (this.state.editComplete === true) {
            return App;
        }

        console.log(this.state.modelName);

        const { brands, onReturn } = this.props;
        const { modelName, color, brand, productionYear } = this.state;
        return (
            <div className="container col-2 AlignCenter">
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <label>Model</label>
                    <br />
                    <input
                        name="modelName"
                        type="text"
                        value={modelName}
                        onChange={this.handleChange}
                        placeholder="Car-model"
                        required
                    />
                    <hr />
                    <label>Brand</label>
                    <br />
                    <select onChange={this.handleChange}>
                        <option value={brand}>{brand}</option>
                        {brands.map((brand, index) => (
                            <option name="brand" key={index}>
                                {brand}
                            </option>
                        ))}
                    </select>
                    <hr />
                    <label>Color</label>
                    <br />
                    <input
                        name="color"
                        type="text"
                        value={color}
                        onChange={this.handleChange}
                        placeholder="Car-color"
                        required
                    />
                    <hr />
                    <label>ProductionYear</label>
                    <br />
                    <input
                        name="productionYear"
                        type="datetime"
                        value={productionYear}
                        onChange={this.handleChange}
                        placeholder="Production-Year"
                        required
                    />
                    <hr />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success btn-sm"
                    />
                </form>
                <button
                    onClick={() => onReturn()}
                    className="btn btn-primary btn-sm offset-2"
                >
                    Return
        </button>
            </div>
        );
    }
}

export default EditCarForm;
