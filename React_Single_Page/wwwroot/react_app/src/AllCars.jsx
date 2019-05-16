import React, { Component } from "react";
import "./Components/site.css";

const AllCarsTableList = props => {
  const { carData, onEdit, onDetails, onDelete } = props;

  const rows = carData.map((car, index) => (
    <tr key={car.id} className="col-12">
      <td>{car.modelName}</td>
      <td>{car.brand}</td>
      <td>{car.color}</td>
      <td>{car.productionYear}</td>
      <td>
        <button
          onClick={() => onEdit(car)}
          className="btn btn-warning btn-sm m-1"
        >
          Edit
        </button>
        <button
          onClick={() => onDetails(car)}
          className="btn btn-primary btn-sm m-1"
        >
          Details
        </button>
        <button
          onClick={() => onDelete(car)}
          className="btn btn-danger btn-sm m-1"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

const AllCarsTableName = props => {
  const { onSort, carData } = props;
  const { productionYear } = carData;
  return (
    <thead>
      <tr className="col-12">
        <th
          name="modelName"
          value="modelName"
          onClick={() => onSort("modelName")}
        >
          Model
        </th>
        <th name="brand" onClick={() => onSort("brand")}>
          Brand
        </th>
        <th name="color" onClick={() => onSort("color")}>
          Color
        </th>
        <th name="productionYear" onClick={() => onSort("productionYear")}>
          ProductionYear
        </th>
        <th>Options</th>
      </tr>
    </thead>
  );
};

export default class Cars extends Component {
  render() {
    const {
      carData,
      onEdit,
      onDetails,
      onDelete,
      onSort,
      allCarsStyling
    } = this.props;

    const { center, marginBottom, float } = allCarsStyling;
    let style = center + " " + marginBottom + " " + float;

    console.log(center);

    return (
      <table className={style}>
        <AllCarsTableName onSort={onSort} carData={carData} />
        <AllCarsTableList
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
          carData={carData}
        />
      </table>
    );
  }
}
