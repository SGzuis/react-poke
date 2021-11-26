import './App.css';
import React, {Fragment} from 'react';
import {Layout, Card, Skeleton, Row, Col, Input} from "antd";
import axios from "axios";
import PokeCard from "./Components/PokeCard";

export default class App extends React.Component {
  state = {
    pokemons: [],
    search: '',
  };

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1018', {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    })
      .then((response) => {
        const {pokemons} = this.state;
        const morePokemons = pokemons.concat(response.data.results);
        this.setState({pokemons: morePokemons});
      })
      .catch((error) => {
        console.log(error)
      });
  }

  _onSearch = (event) => {
    this.setState({search: event.target.value});
  }

  _filter = (pokemon) => {
    let {search} = this.state

    search.toLowerCase().trim();

    if (search.length === 0) {
      return true;
    }

    return pokemon.name.toLowerCase().search(search) >= 0
  }

  render() {
    const {pokemons} = this.state;

    return (
      <Layout>
        <Layout className="site-layout">
          <Layout.Header className="site-layout-background" style={{padding: 0}}>

          </Layout.Header>
          <Layout.Content>
            <div className={"form-input"}>
              <Input placeholder="Basic usage" onChange={this._onSearch} />
            </div>
            <Row>
              {
                pokemons.length ? pokemons.filter(this._filter).map((pokemon, index) => (
                  <Col key={pokemon.name} xs={24} sm={12} lg={8} xl={6}>
                    <PokeCard name={pokemon.name} />
                  </Col>
                )) : (
                  <Fragment>
                    <Col xs={24} sm={12} lg={8} xl={6}>
                      <Card title={<Skeleton title={true} button={false} paragraph={false}/>} bordered={false} loading={true}>
                        <p>Card content</p>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8} xl={6}>
                      <Card title={<Skeleton title={true} button={false} paragraph={false}/>} bordered={false} loading={true}>
                        <p>Card content</p>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8} xl={6}>
                      <Card title={<Skeleton title={true} button={false} paragraph={false}/>} bordered={false} loading={true}>
                        <p>Card content</p>
                      </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={8} xl={6}>
                      <Card title={<Skeleton title={true} button={false} paragraph={false}/>} bordered={false} loading={true}>
                        <p>Card content</p>
                      </Card>
                    </Col>
                  </Fragment>
                )
              }
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}