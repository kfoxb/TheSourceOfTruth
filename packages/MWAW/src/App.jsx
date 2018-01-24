import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  color: #FFFBFA;
  background: #666;
  border: none;
  padding: 0.5rem;
  width: 10rem;
  margin: 0.5rem;
  text-align: center;
`
const Menu = styled.div`

`
const Nav = styled.div`
  background: #666;
  opacity: 0.7;
  width: 100%;
  padding: 0.5em;
  margin: 0em;
  height: 45px;
  clear: right;
  z-index: 99;
`
const Search = styled.input`
  display: inline;
  color: #666;
  background: #FFFBFA;
  opacity: 0.8;
  border: 1px solid #666;
  padding: 0.5rem;
  width: 8rem;
  margin: 0.5rem;
  text-align: left;
  position: fixed;
  float: right;
  overflow: none;
  z-index: 100;
`
export default function App() {
  return (
    <Nav>
      <div>
        <Button>Login</Button>
        <Search
        placeholder=" Search"
        innerRef={x => { this.input = x }}
        onMouseEnter={() => this.input.focus()}
      />
      </div>
    </Nav>
  );
}
