import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PetList from "./components/PetList";
import AddPet from "./components/AddPet";
import './App.css';  // Importing the CSS file for styling

const Dashboard = () => {
    return (
        <div>
            {/* ✅ Navbar */}
            <nav className="navbar">
                <h1>🐾 Pet Adoption</h1>
                <ul>
                    <li><Link to="/add-pet">➕ Add Pet</Link></li>
                    <li><Link to="/pet-list">📋 Pet List</Link></li>
                </ul>
            </nav>

            {/* ✅ Dashboard Content */}
            <div className="dashboard-container">
                <h2>🐾 Pet Adoption Dashboard</h2>
                <p>Manage pets, add new ones, and view the pet listings.</p>

                <div className="dashboard-cards">
                    <div className="card">
                        <h3>➕ Add Pet</h3>
                        <p>Add new pets for adoption.</p>
                        <Link to="/add-pet" className="card-btn">Go to Add Pet</Link>
                    </div>

                    <div className="card">
                        <h3>📋 Pet List</h3>
                        <p>View and manage all pets available for adoption.</p>
                        <Link to="/pet-list" className="card-btn">Go to Pet List</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Router>
            <div className="content-container">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-pet" element={<AddPet onPetAdded={() => setRefresh(!refresh)} />} />
                    <Route path="/pet-list" element={<PetList key={refresh} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
