import React, { Component } from "react";

class SortCarTable extends Component {
  state = {
    cars: this.props.cars,
    prevSort: ""
  };

  compareValues = (key, order = "asc") => {
    return function(a, b) {
      // This if-statement is pretty useless atm.
      // But this one verifies that both a and b has the same properies.
      // If they don't, then you return 0.
      // For example: a has properties "name, age, job"
      // While b only has properties "name, age", then this function is useful.
      // NOTE: returning 0 means that the order of the compared values wont change
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      // This checks if the values that's about to be compared are strings,
      // And if they are, they are converted to uppercase, else nothing happens.
      const compareA =
        typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const compareB =
        typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      // This is a standard comparison in Javascript
      // If value A is bigger than value B, value A gets placed before value B
      // And vice versa if value B is bigger than value A
      // The last row is a terorony(?) call which checks if order === "desc"
      // If it does, it reverts the comparison by multiplying by -1, otherwise it
      // Returns the normal values.
      let comparison = 0;
      if (compareA > compareB) {
        comparison = 1;
      } else if (compareA < compareB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  render() {
    const {
      cars,
      onDetails,
      sortCars,
      onEdit,
      onDelete,
      onSort,
      descending
    } = this.props;

    return (
      <table className="marginBottom60 AlignCenter">
        <thead>
          <tr className="col-12">
            <th name="modelName" onClick={() => onSort("modelName")}>
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
        <tbody>
          {cars
            .sort(
              this.compareValues(sortCars, descending === true ? "desc" : "asc")
            )
            .map(car => (
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
                    onClick={() => onDelete(car.id)}
                    className="btn btn-danger btn-sm m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default SortCarTable;
