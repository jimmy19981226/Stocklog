import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/StockPage.css";

export default function StockPage() {
  const [searchParams, setSearchParams] = useState({
    stockName: "",
    purchaseDate: "",
    sellDate: "",
    market: "",
    buyingPrice: "",
    sellingPrice: "",
  });
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({
    stockName: "",
    buyingPrice: "",
    sellingPrice: "",
    transactionFee: "",
    purchaseDate: "",
    sellDate: "",
    quantity: "",
    market: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentStockId, setCurrentStockId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [portfolio, setPortfolio] = useState({
    totalInvested: 0,
    currentValue: 0,
    totalEarnings: 0,
    netProfitLoss: 0,
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    calculatePortfolio();
  }, [stocks]);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stock", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `http://localhost:3000/api/stock/${currentStockId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuccess("Stock updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/stock", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Stock saved successfully!");
      }
      setError(null);
      fetchStocks();
      setEditMode(false);
      setFormData({
        stockName: "",
        buyingPrice: "",
        sellingPrice: "",
        transactionFee: "",
        purchaseDate: "",
        sellDate: "",
        quantity: "",
        market: "",
      });
    } catch (error) {
      console.error("Error saving stock:", error);
      setError(error.response?.data?.message || "Error saving stock");
      setSuccess(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/stock/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleEdit = (stock) => {
    setFormData({
      stockName: stock.stockName,
      buyingPrice: stock.buyingPrice,
      sellingPrice: stock.sellingPrice,
      transactionFee: stock.transactionFee,
      purchaseDate: stock.purchaseDate,
      sellDate: stock.sellDate,
      quantity: stock.quantity,
      market: stock.market,
    });
    setCurrentStockId(stock._id);
    setEditMode(true);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/stock/search",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: searchParams,
        }
      );
      setStocks(response.data);
    } catch (error) {
      console.error("Error searching stocks:", error);
      setError(error.response?.data?.message || "Error searching stocks");
    }
  };

  const handleReset = () => {
    setSearchParams({
      stockName: "",
      purchaseDate: "",
      sellDate: "",
      market: "",
      buyingPrice: "",
      sellingPrice: "",
    });
    fetchStocks();
  };

  const calculatePortfolio = () => {
    let totalInvested = 0;
    let currentValue = 0;
    let totalEarnings = 0;
    let totalTransactionFees = 0;

    stocks.forEach((stock) => {
      const { buyingPrice, sellingPrice, quantity, transactionFee } = stock;
      totalInvested += buyingPrice * quantity;
      currentValue += sellingPrice ? sellingPrice * quantity : 0;
      totalEarnings += sellingPrice
        ? (sellingPrice - buyingPrice) * quantity
        : 0;
      totalTransactionFees += transactionFee || 0;
    });

    const netProfitLoss = totalEarnings - totalTransactionFees;

    setPortfolio({
      totalInvested,
      currentValue,
      totalEarnings,
      netProfitLoss,
    });
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
          <form className="stock-form" onSubmit={handleSave}>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="text"
                name="stockName"
                placeholder="Stock Name"
                value={formData.stockName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Buying Price</label>
              <input
                type="number"
                name="buyingPrice"
                placeholder="0.00"
                value={formData.buyingPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                placeholder="0.00"
                value={formData.sellingPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Transaction Fee</label>
              <input
                type="number"
                name="transactionFee"
                placeholder="0.00"
                value={formData.transactionFee}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Sell Date</label>
              <input
                type="date"
                name="sellDate"
                value={formData.sellDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="0.00"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Market</label>
              <input
                type="text"
                name="market"
                placeholder="Market Name"
                value={formData.market}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="save-button"
              style={{ backgroundColor: "#14AE5C" }}
            >
              {editMode ? "Update" : "Save"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </section>
        <div className="bottom-section">
          <section className="stock-table">
            <h2>Your Stock</h2>
            <div className="search-bar">
              <div className="search-field">
                <label>Stock</label>
                <input
                  type="text"
                  name="stockName"
                  placeholder="Stock Name"
                  value={searchParams.stockName}
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
              <div className="search-field">
                <label>Market</label>
                <input
                  type="text"
                  name="market"
                  placeholder="Market Name"
                  value={searchParams.market}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={handleSearch}>
                  Search
                </button>
                <button
                  type="button"
                  className="reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
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
                {stocks.map((stock) => (
                  <tr key={stock._id}>
                    <td>{stock.stockName}</td>
                    <td>{stock.buyingPrice}</td>
                    <td>{stock.sellingPrice}</td>
                    <td>{stock.transactionFee}</td>
                    <td>{stock.purchaseDate}</td>
                    <td>{stock.sellDate}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.market}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        style={{ color: "#8AA5ED", marginRight: "10px" }}
                        onClick={() => handleEdit(stock)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        style={{ color: "#FF4C6C" }}
                        onClick={() => handleDelete(stock._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="portfolio">
            <h2>Portfolio</h2>
            <p>Total Capital Invested: ${portfolio.totalInvested.toFixed(2)}</p>
            <p>Current Portfolio Value: ${portfolio.currentValue.toFixed(2)}</p>
            <p>Total Earnings: ${portfolio.totalEarnings.toFixed(2)}</p>
            <p>Net Profit/Loss: ${portfolio.netProfitLoss.toFixed(2)}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
