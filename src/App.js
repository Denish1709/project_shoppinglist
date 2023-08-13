import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ShoppingList from "./pages/shoppinglist";
import EditItems from "./pages/edit";
import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Button } from "react-bootstrap";

import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";

function App() {
  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 200 }} p="xs"> 
      <Navbar.Section>
            <img src="/FCSL.png" className="ms-3" style={{ width: "100%", maxWidth: "150px" }} />
          </Navbar.Section>
          <Navbar.Section className="mt-3 text-center"> 
            <a href="/">
              <Button className="navbtn mx-auto" size="lg" variant="success">
                  <span className="iconHome"><AiOutlineHome /></span>
                  <span className="iconText">Home</span>
              </Button>
              </a>
            </Navbar.Section>
            <Navbar.Section className="navtext text-success">
            <p>Created By: <br/> Shawn & Denish</p>
            <p> Co-Founders of <br/> FC.SDN.BHD.</p>
          </Navbar.Section>
      </Navbar>}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.dark[0]
        }
      })}
    >
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/edit/:id" element={<EditItems />} />
        </Routes>
      </Router>
    </AppShell>
  );
}

export default App;
