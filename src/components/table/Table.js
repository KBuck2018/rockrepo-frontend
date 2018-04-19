import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Table.css";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor() {
    super();
  }
  render() {
    const data = this.props.props.climbs.routes;

    return (
      <div className="table">
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
