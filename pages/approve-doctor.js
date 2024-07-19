import React, { Component } from "react";
import {
  Segment,
  Input,
  Header,
  Message,
  Button,
  Form,
} from "semantic-ui-react";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";

class ApproveDoctor extends Component {
  state = {
    doctorAddr: "", // Store the Ethereum address of the doctor
    loading: "", // Flag to indicate if the approve action is in progress
    errorMessage: "", // Error message if any
  };
  // Define the onSubmit event handler
  onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    this.setState({ loading: true, errorMessage: "" });

    try {
      // Get the list of Ethereum accounts
      const accounts = await web3.eth.getAccounts();

      // Call the givePermission function of the record contract
      await record.methods
        .givePermission(this.state.doctorAddr)
        .send({ from: accounts[0] });

      alert("Permission Granted Successfully!");
    } catch (err) {
      // Catch any error and set the error message
      this.setState({ errorMessage: err.message });
    }

    // Set the loading flag to false and clear the doctor's address
    this.setState({ loading: false, doctorAddr: "" });
  };

  // Render the ApproveDoctor component
  render() {
    return (
      <Layout>
        <Segment>
          <Header
            as="h2"
            content="Allow Access"
            subheader="Give doctor or patient permission to view records"
          ></Header>
          <Input
            fluid
            placeholder="Doctor's Ethereum Address"
            value={this.state.doctorAddr}
            onChange={(event) =>
              this.setState({ doctorAddr: event.target.value })
            }
          />
          <br />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Approve
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default ApproveDoctor;
