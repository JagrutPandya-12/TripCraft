
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const TripContext = createContext();

export function TripProvider({ children }) {

  const [selectedTrips, setSelectedTrips] = useState([]);
  const [activities, setActivities] = useState([]);

  const [tripName, setTripName] = useState("My Dream Trip");

  const [budgetLimit, setBudgetLimit] = useState(150000);

  // Add destination
  const addDestination = (destination) => {
    setSelectedTrips((current) => {
      if (current.some((item) => item.id === destination.id)) {
        return current;
      }

      return [...current, destination];
    });
  };

  // Remove destination
  const removeDestination = (id) => {
    setSelectedTrips((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  // Add activity
  const addActivity = (activity) => {
    setActivities((current) => [
      ...current,
      { ...activity, id: Date.now() }
    ]);
  };

  // Remove activity
  const removeActivity = (id) => {
    setActivities((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  // Calculate total budget
  const total = useMemo(() => {
    const destinationCost = selectedTrips.reduce(
      (sum, item) => sum + item.cost, 0
    );

    const activityCost = activities.reduce(
      (sum, item) => sum + Number(item.cost), 0
    );

    return destinationCost + activityCost;
  }, [selectedTrips, activities]);

  return (
    <TripContext.Provider
      value={{
        selectedTrips,
        activities,
        tripName,
        setTripName,
        budgetLimit,
        setBudgetLimit,
        total,
        addDestination,
        removeDestination,
        addActivity,
        removeActivity
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

TripProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTrip = () => useContext(TripContext);
