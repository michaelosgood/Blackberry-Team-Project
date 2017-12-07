import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./Home.css";


class Home extends Component {
  state = {
    restaurants: [],
    name: "",
    zip: "",
    img: "",
    waittime: "",
  };

  componentDidMount() {
    this.searchRestaurants();
  }

  loadRestaurants = () => {
    API.getRestaurants()
      .then(res =>
        this.setState({ restaurants: res.data, name: "", category: "", city: "", zip: "", img: "", waittime: ""  })
      )
      .catch(err => console.log(err));
  };

  searchRestaurants = () => {
    console.log(this.props.match.params.id)
    API.getRestaurant(this.props.match.params.id)
      .then(res =>
        this.setState({ restaurants: res.data, name: "", category: "", city: "", zip: "", img: "", waittime: ""  })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
      <Nav />
          <Container fluid>
          <Row>
              <Col size="sm-12 md-12" className='homespacing'>
              <form>
                    <input type="text" className="searchbarinput" name="restaurant" placeholder="Search..."/>
                    <FormBtn

                      onClick={() => this.searchRestaurants()}
                    >
                      Submit Name
                    </FormBtn>
              </form>
                {this.state.restaurants.length ? (
                  <List>
                    {this.state.restaurants.map(restaurant => (
                      <Col size="sm-6 md-6" key={restaurant._id}>

                        <Row className="homerow">
                          <Col className="homeimages" size="xs-8 sm-6 md-6">
                          <Link to={"/checkin/" + restaurant._id}>
                              <img alt='res' className="homeimg" src={restaurant.img} />
                            </Link>
                          </Col>
                          <Col size="xs-4 sm-6 md-6" className="homedetails">

                            <Link to={"/checkin/" + restaurant.name}>
                              {restaurant.name}
                              <br />

                              <br />
                              {restaurant.city}, {restaurant.zip}
                              <br />

                              <br/><br/>
                              {restaurant.category}
                            </Link>
                          </Col>
                        </Row>
                        <Row className='homedetail'>
                        <Col size="xs-12 sm-12 md-12" className="homedetail">
                        {restaurant.waittime} min. wait
                        </Col>
                        </Row>
                       <br/>

                      </Col>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        <Footer />
      </div>
    );
  }
}
export default Home;