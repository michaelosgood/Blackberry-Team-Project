import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Footer from "../../components/Footer";
import "./SignIn.css";


class SignIn extends Component {
    state = {
      books: [],
      title: "",
      author: "",
      synopsis: ""
    };
  
    componentDidMount() {
      this.loadBooks();
    }
  
    loadBooks = () => {
      API.getBooks()
        .then(res =>
          this.setState({ books: res.data, title: "", author: "", synopsis: "" })
        )
        .catch(err => console.log(err));
    };
  
    deleteBook = id => {
      API.deleteBook(id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      if (this.state.title && this.state.author) {
        API.saveBook({
          title: this.state.title,
          author: this.state.author,
          synopsis: this.state.synopsis
        })
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      }
    };
  
    render() {
      console.log(this.state)
      return (
        <div>
            <Container fluid>
              <Row>
                <Col size="md-12">
                  <div>
                    <h1>Sign in here!</h1>
                  </div>
                  <form>
                    <Input
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      name="title"
                      placeholder="Name (required)"
                    />
                    <Input
                      value={this.state.author}
                      onChange={this.handleInputChange}
                      name="author"
                      placeholder="Number of guests in party (required)"
                    />
                    <Input
                    value={this.state.synopsis}
                    onChange={this.handleInputChange}
                    name="synopsis"
                    placeholder="Phone Number (required)"
                    />
                    <FormBtn
                      disabled={!(this.state.author && this.state.title)}
                      onClick={this.handleFormSubmit}
                    >
                      Submit Name
                    </FormBtn>
                  </form>
                  <a href="/trivia">
                    <h1>Play Trivia!</h1>
                  </a>
                </Col>
              </Row>
            </Container>
          <Footer />
        </div>
      );
    }
  }
  
  export default SignIn;