import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Table.css";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor() {
    super();
    this.state;
  }
  render() {
    const data = this.props.props.climbs.routes;
    // let climb = data.map((climb, index) => {
    //   return (
    //     <li key={index}>
    //       <Link to={"/main/" + climb.id}>{climb.name}</Link>
    //     </li>
    //   );
    // });
    return (
      <div className="table">
        {/* {climb} */}
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              accessor: "name",
              Cell: e => <Link to={"/main/" + data[e.index].id}>{e.value}</Link>
            },
            {
              Header: "Type",
              accessor: "type"
            },
            {
              Header: "Rating",
              accessor: "rating"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default Table;
