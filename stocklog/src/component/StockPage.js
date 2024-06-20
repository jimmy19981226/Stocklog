import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/StockPage.css";

export default function StockPage() {
  const [searchParams, setSearchParams] = useState({
    stock: "",
    purchaseDate: "",
    sellDate: "",
    market: "",
    buyingPrice: "",
    sellingPrice: "",
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  return (
    <div className="stock-page-container">
      <header className="stock-page-header">
        <h1 className="stock-logo">StockLog</h1>
        <div className="header-icons">
          <Link to="/stock">
            <i className="fas fa-home" style={{ color: "#8AA5ED" }}></i>
          </Link>
          <Link to="/profile">
            <i className="fas fa-user" style={{ color: "#8AA5ED" }}></i>
          </Link>
        </div>
      </header>
      <main className="stock-page-main">
        <section className="stock-data">
          <h2>Your Stock Data</h2>
          <form className="stock-form">
            <div className="form-group">
              <label>Stock</label>
              <input type="text" name="stock" placeholder="AAPL" />
            </div>
            <div className="form-group">
              <label>Buying Price</label>
              <input type="number" name="buyingPrice" placeholder="145.50" />
            </div>
            <div className="form-group">
              <label>Selling Price</label>
              <input type="number" name="sellingPrice" placeholder="150.00" />
            </div>
            <div className="form-group">
              <label>Transaction Fee</label>
              <input type="number" name="transactionFee" placeholder="2.99" />
            </div>
            <div className="form-group">
              <label>Purchase Date</label>
              <input type="date" name="purchaseDate" />
            </div>
            <div className="form-group">
              <label>Sell Date</label>
              <input type="date" name="sellDate" />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" placeholder="10" />
            </div>
            <div className="form-group">
              <label>Market</label>
              <input type="text" name="market" placeholder="NASDAQ" />
            </div>
            <button
              type="submit"
              className="save-button"
              style={{ backgroundColor: "#14AE5C" }}
            >
              Save
            </button>
          </form>
        </section>
        <div className="bottom-section">
          <section className="stock-table">
            <h2>Your Stock</h2>
            <div className="search-bar">
              <div className="search-field">
                <label>Stock</label>
                <input
                  type="text"
                  name="stock"
                  placeholder="Stock"
                  value={searchParams.stock}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-field">
                <label>Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={searchParams.purchaseDate}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-field">
                <label>Sell Date</label>
                <input
                  type="date"
                  name="sellDate"
                  value={searchParams.sellDate}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-field">
                <label>Market</label>
                <input
                  type="text"
                  name="market"
                  placeholder="Market"
                  value={searchParams.market}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-field">
                <label>Buying Price</label>
                <input
                  type="number"
                  name="buyingPrice"
                  placeholder="Buying Price"
                  value={searchParams.buyingPrice}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="search-field">
                <label>Selling Price</label>
                <input
                  type="number"
                  name="sellingPrice"
                  placeholder="Selling Price"
                  value={searchParams.sellingPrice}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="button">Search</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Buying Price</th>
                  <th>Selling Price</th>
                  <th>Transaction Fee</th>
                  <th>Purchase Date</th>
                  <th>Sell Date</th>
                  <th>Quantity</th>
                  <th>Market</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Example data */}
                <tr>
                  <td>AAPL</td>
                  <td>145.50</td>
                  <td>150.00</td>
                  <td>2.99</td>
                  <td>2023-05-20</td>
                  <td>2023-06-15</td>
                  <td>10</td>
                  <td>NASDAQ</td>
                  <td>
                    <i
                      className="fas fa-trash"
                      style={{ color: "#FF4C6C" }}
                    ></i>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </section>
          <section className="portfolio">
            <h2>Portfolio</h2>
            <p>Total Capital Invested:</p>
            <p>Current Portfolio Value:</p>
            <p>Total Earnings:</p>
            <p>Net Profit/Loss:</p>
          </section>
        </div>
      </main>
    </div>
  );
}
