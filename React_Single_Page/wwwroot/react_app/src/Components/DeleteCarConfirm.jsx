import React, { Component } from "react";
import "./site.css";

class DeleteCarConfirm extends Component {
  state = {
    oneCar: this.props.oneCar,
    deleteConfirmed: false
  };
  render() {
    const { modelName, brand, color, productionYear } = this.state.oneCar;
    return (
      <div classname="container AlignCenter marginBottom60">
        <p>Are you sure you want to remove {modelName}?</p>
        <p>
          <strong>This action can NOT be reverted.</strong>
        </p>
        <table>
          <tr>
            <td>sd</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default DeleteCarConfirm;
