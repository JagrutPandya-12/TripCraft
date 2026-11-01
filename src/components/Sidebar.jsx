
import { NavLink } from "react-router-dom";
import {
  Compass,
  BriefcaseBusiness,
  Map,
  Wallet,
  Plane
} from "lucide-react";

export default function Sidebar() {

  const links = [
    { path: "/", name: "Explore", icon: Compass },
    { path: "/trips", name: "My Trips", icon: BriefcaseBusiness },
    { path: "/itinerary", name: "Itinerary", icon: Map },
    { path: "/budget", name: "Budget", icon: Wallet }
  ];

  return (
    <aside className="sidebar">

      <div className="brand">
        <Plane size={27} />
        <span>TripCraft</span>
      </div>

      <nav>
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-art">
        <span>✈</span>
        <p>Your next adventure starts here.</p>
      </div>

    </aside>
  );
}
