import React, { Component } from "react";

class SortCarTable extends Component {
  state = {
    cars: this.props.cars,
    prevSort: ""
  };

  compareValues = (key, order = "asc") => {
    const { prevSort } = this.state;
    return function(a, b) {
      // This if-statement is pretty useless atm.
      // But this one verifies that both a and b has the same properies.
      // If they don't, then you return 0.
      // For example: a has properties "name, age, job"
      // While b only has properties "name, age", then this function is useful.
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      // This checks if the values that's about to be compared are strings,
      // And if they are, they are converted to uppercase, else nothing happens.
      const compareA =
        typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const compareB =
        typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      // This is a standard comparison in Javascript (apparently)
      // Ask Ulf more about this later/tomorrow(Tuesday)
      let comparison = 0;
      if (compareA > compareB) {
        comparison = 1;
      } else if (compareA < compareB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    }.bind(this);
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
    let { prevSort } = this.state;

    // make a variable in App for ascending/descending

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

// const SortCarTableHeader = props => {
//   console.log(props);
//   const { onSort } = props;
//   return (
//     <thead>
//       <tr className="col-12">
//         <th name="modelName" onClick={() => onSort("modelName")}>
//           Model
//         </th>
//         <th name="brand" onClick={() => onSort("brand")}>
//           Brand
//         </th>
//         <th name="color" onClick={() => onSort("color")}>
//           Color
//         </th>
//         <th name="productionYear" onClick={() => onSort("productionYear")}>
//           ProductionYear
//         </th>
//         <th>Options</th>
//       </tr>
//     </thead>
//   );
// };

// const SortCarTableBody = props => {
//   const { cars, onDetails, sortCars, onEdit, onDelete, compareValues } = props;
//   const { productionYear } = cars;

//   console.log(sortCars);

//   let sortingArray = "";

//   if (sortCars === "productionYear") {
//     console.log("I'm a string!");

//     // sortingArray += ".sort((a, b) => a[sortCars].localeCompare(b[sortCars]))";
//   }

//   const rows = cars
//     // .sort((a, b) => a[sortCars].localeCompare(b[sortCars]))
//     .sort(compareValues(sortCars, "asc"))
//     .map(car => (
//       <tr key={car.id} className="col-12">
//         <td>{car.modelName}</td>
//         <td>{car.brand}</td>
//         <td>{car.color}</td>
//         {console.log(typeof car.productionYear)}
//         <td>{car.productionYear}</td>
//         <td>
//           <button
//             onClick={() => onEdit(car)}
//             className="btn btn-warning btn-sm m-1"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => onDetails(car)}
//             className="btn btn-primary btn-sm m-1"
//           >
//             Details
//           </button>
//           <button
//             onClick={() => onDelete(car.id)}
//             className="btn btn-danger btn-sm m-1"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ));

//   // const rows = cars.map(car => (
//   //   <tr key={car.id} className="col-12">
//   //     <td>{car.modelName}</td>
//   //     <td>{car.brand}</td>
//   //     <td>{car.color}</td>
//   //     <td>{car.productionYear}</td>
//   //     <td>
//   //       <button
//   //         onClick={() => onEdit(car)}
//   //         className="btn btn-warning btn-sm m-1"
//   //       >
//   //         Edit
//   //       </button>
//   //       <button
//   //         onClick={() => onDetails(car)}
//   //         className="btn btn-primary btn-sm m-1"
//   //       >
//   //         Details
//   //       </button>
//   //       <button
//   //         onClick={() => onDelete(car.id)}
//   //         className="btn btn-danger btn-sm m-1"
//   //       >
//   //         Delete
//   //       </button>
//   //     </td>
//   //   </tr>
//   // ));

//   return <tbody>{rows}</tbody>;
// };

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "" };
//   }
//   render() {
//     const { sortCars, cars, onEdit, onDetails, onDelete, onSort } = this.props;

//     return (
//       <table className="marginBottom60 AlignCenter">
//         <SortCarTableHeader onSort={onSort} cars={cars} />
//         <SortCarTableBody
//           cars={cars}
//           onEdit={onEdit}
//           onDetails={onDetails}
//           onDelete={onDelete}
//           sortCars={sortCars}
//         />
//       </table>
//     );
//   }
// }
