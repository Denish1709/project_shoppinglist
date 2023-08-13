import "./shopping.css";
import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// edit button

export default function ShoppingLists() {
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  // edit button
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (shoppingList) {
      setList(shoppingList);
    }
  }, []);

  const filteredList = useMemo(() => {
    return list.filter((i) => (filter === "" ? true : i.category === filter));
  }, [filter, list]);

  const deleteShoppingList = (id) => {
    const newList = list.filter((i) => i.id !== id);
    setList(newList);
    localStorage.setItem("shoppingList", JSON.stringify(newList));
  };

  const checkBoxAll = (event) => {
    if (event.target.checked) {
      const newCheckedList = [];
      list.forEach((i) => {
        newCheckedList.push(i.id);
      });
      setCheckedList(newCheckedList);
      setCheckAll(true);
    } else {
      setCheckedList([]);
      setCheckAll(false);
    }
  };

  const checkboxOne = (event, id) => {
    if (event.target.checked) {
      const newCheckedList = [...checkedList];
      newCheckedList.push(id);
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((i) => i !== id);
      setCheckedList(newCheckedList);
    }
  };

  const deleteCheckItems = () => {
    const newList = list.filter((i) => {
      if (checkedList && checkedList.includes(i.id)) {
        return false;
      }
      return true;
    });
    setList(newList);
    localStorage.setItem("shoppingList", JSON.stringify(newList));
    setCheckAll(false);
  };

  return (
    <div className="container mt-5 mx-auto" style={{ maxwidth: "800px" }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center text-success">
            <h2>
               Shopping List
            </h2>
          </Card.Title>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <>
              <Button
                variant="success"
                size="md"
                className="me-2 mb-4"
                onClick={() => setModalShow(true)}
              >
                Add New Item
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    // retrieve the updated shopping list from local storage to state
                    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
                    if (shoppingList) {
                      setList(shoppingList);
                    }
                }}
                />
            </>
          </div>
          <Form.Select
            className="mb-4 text-success"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
              <option value="">All Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Can-Food">Can Foods</option>
              <option value="Wet-Items">Wet Items</option>
              <option value="Dry-Items">Dry Items</option>
              <option value="Snacks">Snacks</option>
              <option value="Household">Household Supplies</option>
              <option value="Others">Others</option>
          </Form.Select>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={checkAll}
                      disabled={list && list.length > 0 ? false : true}
                      onChange={(event) => {
                        checkBoxAll(event);
                      }}
                    />
                  </div>
                </th>
                <th>
                  <div className="text-center text-success">Items</div>
                </th>
                <th>
                  <div className="text-center text-success">Category</div>
                </th>
                <th>
                  <div className="text-center text-success">Quantity</div>
                </th>
                <th>
                  <div className="text-center text-success">
                    Actions
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      disabled={
                        checkedList && checkedList.length > 0 ? false : true
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCheckItems();
                      }}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((i) => {
                  return (
                    <tr key={i.id}>
                      <td>
                        <div className="text-center">
                          <Form.Check
                            checked={
                              checkedList && checkedList.includes(i.id)
                                ? true
                                : false
                            }
                            type="checkbox"
                            onChange={(event) => {
                              checkboxOne(event, i.id);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="text-center text-success">{i.item}</div>
                      </td>
                      <td>
                        <div className="text-center text-success">{i.category}</div>
                      </td>
                      <td>
                        <div className="text-center text-success">{i.quantity}</div>
                      </td>
                      <td>
                        <div className="text-center">
                          <>
                            <Link
                              to={`/edit/${i.id}`}
                              className="me-2 fs-5">
                              <Button variant="secondary" size="sm">
                                <AiOutlineEdit />
                              </Button>
                            </Link>
                          </>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteShoppingList(i.id);
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    <img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" />
                    <h1 className="text-center pe-5 text-secondary">
                      NO ITEM ADDED YET
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="mt-5 text-center">
      <Link to="/">              
             <Button variant="success" size="md">
               <HiArrowNarrowLeft />Back to Home
             </Button>
           </Link>
      </div>
    </div>
  );
}

export function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (shoppingList) {
      setList(shoppingList);
    }
  }, []);

  const addShoppingList = () => {
    const newList = [...list];

    if (item && quantity) {
      newList.push({
        id: Math.floor(Math.random() * 100000),
        item: item,
        quantity: quantity,
        category: category,
      });

      setList(newList);
      localStorage.setItem("shoppingList", JSON.stringify(newList));

      setItem("");
      setQuantity("");
    } else {
      alert("Please add your Shopping List");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-success">
          Add Shopping List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addShoppingList();
          }}
        >
          <div className="mb-3">
            <label for="list-item" className="h4 form-label">
              Item
            </label>
            <input
              type="text"
              className="form-control"
              id="list-item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="category" className="h4 form-label">
              Category
            </label>
            <select
              className="form-control text-secondary"
              id="item-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value="">Select a Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Can-Food">Can Foods</option>
              <option value="Wet-Items">Wet Items</option>
              <option value="Dry-Items">Dry Items</option>
              <option value="Snacks">Snacks</option>
              <option value="Household">Household Supplies</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="list-quantity" className="h4 form-label">
              Quantity
            </label>
            <input
              type="text"
              className="form-control"
              id="list-quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="text-end text-success">
            <Button type="submit" size="md" className="btn btn-success">
              Add
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
