import React, { Component } from "react";
import { Card, Input, Form } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

// Define the RecordsList
class RecordsList extends Component {
  state = {
    search: "",
  };
  //fetch data on server-side rendering
  static async getInitialProps() {
    // Fetch all patient records from the Ethereum blockchain
    const allRecords = await record.methods.getPatients().call();

    return { allRecords };
  }

  renderRecords() {
    // Map each patient record to a card item
    const items = this.props.allRecords.map((address) => {
      return {
        header: address, // Display the patient's Ethereum address as the header
        description: (
          <Link route={`/record/${address}`}>
            <a>View Record</a>
          </Link>
        ),
        fluid: true,
      };
    });
    //Add all records to card group
    return <Card.Group items={items} />;
  }

  // Handle search form submission
  onSearch = async (event) => {
    event.preventDefault(); //prevent browser from submitting form to back end server

    Router.pushRoute(`/record/${this.state.search}`);
  };

  // Render the RecordsList component
  render() {
    return (
      <Layout>
        <div>
          <Form onSubmit={this.onSearch}>
            <Form.Field>
              <Input
                fluid
                action={{ icon: "search" }}
                placeholder="Search..."
                onChange={(event) =>
                  this.setState({ search: event.target.value })
                }
              />
              <br />
            </Form.Field>
          </Form>
          <h2>Medical Records List</h2>
          {this.renderRecords()}
        </div>
      </Layout>
    );
  }
}

export default RecordsList;
