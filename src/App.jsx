
import { useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  MapPin,
  CalendarDays,
  Wallet,
  IndianRupee,
  PieChart,
  Trash2,
  Plus,
  ArrowRight
} from "lucide-react";

import { TripProvider, useTrip } from "./context/TripContext";

import { destinations } from "./data/destinations";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DestinationCard from "./components/DestinationCard";
import MapPanel from "./components/MapPanel";


function Explore() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { selectedTrips, addDestination } = useTrip();

  const categories = [
    "All",
    "Beaches",
    "Mountains",
    "Cities",
    "Adventure",
    "Historical"
  ];

  const filteredDestinations = useMemo(() => {

    return destinations.filter((item) => {

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesSearch =
        `${item.name} ${item.country}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [search, category]);

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
      />

      <main className="page-content">

        <section className="welcome">

          <div>
            <span className="eyebrow">
              MAKE EVERY JOURNEY COUNT
            </span>

            <h1>
              Explore Dream <span>Destinations</span>
            </h1>

            <p>
              Plan your trip, discover new places and
              create unforgettable memories.
            </p>
          </div>

        </section>

        <div className="category-row">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category active-category"
                  : "category"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <div className="section-heading">
          <div>
            <h2>Popular Destinations</h2>
            <p>Discover places for your next adventure.</p>
          </div>

          <span>{filteredDestinations.length} places</span>
        </div>

        {filteredDestinations.length > 0 ? (

          <div className="destination-grid">

            {filteredDestinations.map((item) => (

              <DestinationCard
                key={item.id}
                destination={item}
                selected={selectedTrips.some(
                  (trip) => trip.id === item.id
                )}
                onAdd={addDestination}
              />

            ))}

          </div>

        ) : (

          <div className="empty-state">
            No destinations found.
          </div>

        )}

        <div className="section-heading map-heading">
          <div>
            <h2>Explore on Map</h2>
            <p>Discover destinations around the world.</p>
          </div>
        </div>

        <MapPanel places={filteredDestinations} />

        <div className="cta-banner">

          <div>
            <h2>Plan Your Perfect Trip</h2>
            <p>Discover. Plan. Travel.</p>
          </div>

          <Link to="/itinerary" className="primary-link">
            Start Planning <ArrowRight size={17} />
          </Link>

        </div>

      </main>
    </>
  );
}

// ----------------------------------
// MY TRIPS PAGE
// ----------------------------------

function Trips() {

  const {
    selectedTrips,
    removeDestination,
    total,
    tripName,
    setTripName
  } = useTrip();

  return (
    <>
      <Header showSearch={false} />

      <main className="page-content">

        <div className="page-title">
          <span className="eyebrow">YOUR TRAVEL COLLECTION</span>
          <h1>My Trips</h1>
          <p>Manage your selected travel destinations.</p>
        </div>

        <div className="trip-summary">

          <div>
            <CalendarDays size={28} />

            <div>
              <h2>
                {selectedTrips.length} Destinations Selected
              </h2>
              <small>Your travel collection</small>
            </div>
          </div>

          <div className="summary-cost">
            <small>ESTIMATED TOTAL</small>
            <strong>
              ₹ {total.toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

        <label className="field-label">
          Trip Name

          <input
            className="text-input"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />

        </label>

        {selectedTrips.length > 0 ? (

          <div className="trip-list">

            {selectedTrips.map((item) => (

              <div className="trip-row" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="trip-row-info">
                  <h3>{item.name}, {item.country}</h3>

                  <p>
                    <MapPin size={14} />
                    {item.days} Days · {item.category}
                  </p>
                </div>

                <strong>
                  ₹ {item.cost.toLocaleString("en-IN")}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeDestination(item.id)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-panel">
            <h2>No trips added yet!</h2>
            <p>Explore destinations and add your favourite places.</p>

            <Link to="/" className="primary-link">
              Explore Destinations
            </Link>
          </div>

        )}

        {selectedTrips.length > 0 && (

          <Link to="/itinerary" className="primary-link continue-link">
            Continue to Itinerary <ArrowRight size={17} />
          </Link>

        )}

      </main>
    </>
  );
}

// ----------------------------------
// ITINERARY PAGE
// ----------------------------------

function Itinerary() {

  const {
    selectedTrips,
    activities,
    addActivity,
    removeActivity,
    total
  } = useTrip();

  const [activityName, setActivityName] = useState("");
  const [activityCost, setActivityCost] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !activityName.trim() ||
      activityCost === "" ||
      Number(activityCost) < 0
    ) {
      return;
    }

    addActivity({
      name: activityName.trim(),
      cost: Number(activityCost)
    });

    setActivityName("");
    setActivityCost("");
  };

  return (
    <>
      <Header showSearch={false} />

      <main className="page-content">

        <div className="page-title">
          <span className="eyebrow">MAKE IT YOURS</span>
          <h1>Your Itinerary</h1>
          <p>Organise destinations and activities.</p>
        </div>

        <div className="itinerary-layout">

          <section className="content-panel">

            <h2>
              <CalendarDays size={20} /> Destinations
            </h2>

            {selectedTrips.map((item, index) => (

              <div className="itinerary-item" key={item.id}>

                <span className="step-number">
                  {index + 1}
                </span>

                <img src={item.image} alt={item.name} />

                <div className="itinerary-item-info">
                  <strong>{item.name}</strong>
                  <small>{item.days} Days</small>
                </div>

                <b>
                  ₹ {item.cost.toLocaleString("en-IN")}
                </b>

              </div>

            ))}

            {selectedTrips.length === 0 && (
              <p className="empty-text">
                No destinations selected.
                <Link to="/"> Explore destinations</Link>
              </p>
            )}

          </section>

          <section className="content-panel">

            <h2>
              <CalendarDays size={20} /> Activities
            </h2>

            <form
              className="activity-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                placeholder="Activity name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                required
              />

              <input
                type="number"
                min="0"
                placeholder="Cost ₹"
                value={activityCost}
                onChange={(e) => setActivityCost(e.target.value)}
                required
              />

              <button type="submit" className="primary-button">
                <Plus size={16} /> Add
              </button>

            </form>

            {activities.map((item) => (

              <div className="activity-row" key={item.id}>

                <div>
                  <strong>{item.name}</strong>
                  <small>Additional activity</small>
                </div>

                <b>
                  ₹ {Number(item.cost).toLocaleString("en-IN")}
                </b>

                <button
                  className="icon-delete"
                  onClick={() => removeActivity(item.id)}
                >
                  <Trash2 size={17} />
                </button>

              </div>

            ))}

          </section>

        </div>

        <div className="itinerary-total">
          <span>Current Estimated Trip Cost</span>

          <strong>
            ₹ {total.toLocaleString("en-IN")}
          </strong>
        </div>

      </main>
    </>
  );
}

// ----------------------------------
// BUDGET PAGE
// ----------------------------------

function Budget() {

  const {
    selectedTrips,
    activities,
    total,
    budgetLimit,
    setBudgetLimit
  } = useTrip();

  const remaining = budgetLimit - total;

  const percentage = budgetLimit > 0
    ? Math.min(100, Math.round((total / budgetLimit) * 100))
    : 0;

  return (
    <>
      <Header showSearch={false} />

      <main className="page-content">

        <div className="page-title">
          <span className="eyebrow">SPEND SMARTER</span>
          <h1>Budget Overview</h1>
          <p>Track and manage your travel expenses.</p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <IndianRupee />
            <small>Total Estimated</small>
            <strong>₹ {total.toLocaleString("en-IN")}</strong>
          </div>

          <div className="stat-card">
            <MapPin />
            <small>Destinations</small>
            <strong>{selectedTrips.length}</strong>
          </div>

          <div className="stat-card">
            <PieChart />
            <small>Activities</small>
            <strong>{activities.length}</strong>
          </div>

        </div>

        <div className="budget-layout">

          <section className="content-panel">

            <h2>
              <Wallet size={20} /> Budget Breakdown
            </h2>

            <label className="field-label">
              Set Budget Limit (₹)

              <input
                className="text-input"
                type="number"
                min="0"
                value={budgetLimit}
                onChange={(e) =>
                  setBudgetLimit(Math.max(0, Number(e.target.value)))
                }
              />

            </label>

            <div className="budget-numbers">

              <div>
                <small>ESTIMATED SPEND</small>
                <strong>₹ {total.toLocaleString("en-IN")}</strong>
              </div>

              <div>
                <small>
                  {remaining >= 0 ? "REMAINING" : "OVER BUDGET"}
                </small>

                <strong className={remaining < 0 ? "over-budget" : ""}>
                  ₹ {Math.abs(remaining).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p>{percentage}% of budget used</p>

            {remaining < 0 && (
              <p className="warning-text">
                Your trip is over the selected budget!
              </p>
            )}

          </section>

          <section className="content-panel">

            <h2>Cost Details</h2>

            {selectedTrips.map((item) => (
              <div className="cost-row" key={item.id}>
                <span>{item.name}</span>
                <strong>
                  ₹ {item.cost.toLocaleString("en-IN")}
                </strong>
              </div>
            ))}

            {activities.map((item) => (
              <div className="cost-row" key={item.id}>
                <span>{item.name}</span>
                <strong>
                  ₹ {Number(item.cost).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}

            <div className="cost-row cost-total">
              <strong>Total</strong>
              <strong>
                ₹ {total.toLocaleString("en-IN")}
              </strong>
            </div>

          </section>

        </div>

        <Link to="/itinerary" className="primary-link continue-link">
          Edit Itinerary <ArrowRight size={17} />
        </Link>

      </main>
    </>
  );
}

// ----------------------------------
// MAIN APP AND ROUTING
// ----------------------------------

export default function App() {

  return (

    <TripProvider>

      <div className="app-shell">

        <Sidebar />

        <div className="main-area">

          <Routes>

            <Route path="/" element={<Explore />} />

            <Route path="/trips" element={<Trips />} />

            <Route path="/itinerary" element={<Itinerary />} />

            <Route path="/budget" element={<Budget />} />

            <Route path="*" element={<Explore />} />

          </Routes>

        </div>

      </div>

    </TripProvider>

  );
}
