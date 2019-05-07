import React, { Component } from 'react';

const AllCarsTableList = props => {

    console.log(props);

    const rows = props.carData.map((car) => {

        return (
            <tr key={car.id} className="row">
                <td>{car.modelName}</td>
                <td>{car.brand}</td>
                <td>{car.color}</td>
                <td>{car.productionYear}</td>
            </tr>
        )
    })

    return {rows}
}

const AllCarsTableName = () => {
    return (
        <tr className="row">
            <th>Model</th>
            <th>Brand</th>
            <th>Color</th>
            <th>ProductionYear</th>
        </tr>
    )
}

export default class Cars extends Component {

    render() {

        const { carData } = this.props
        console.log(carData + ' hello, its me!');

        return (
            <table>
                <tbody>
                    <AllCarsTableName />
                    <AllCarsTableList carData={carData} />
                </tbody>
            </table>
        )
    }
}