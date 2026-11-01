
import { Search, Bell } from "lucide-react";
import PropTypes from "prop-types";

export default function Header({
  search,
  setSearch,
  showSearch = true
}) {

  return (
    <header className="topbar">

      {showSearch ? (
        <div className="search-box">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      ) : (
        <div />
      )}

      <div className="top-actions">
        <Bell size={20} />
        <div className="avatar">R</div>
      </div>

    </header>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  showSearch: PropTypes.bool
};

Header.defaultProps = {
  search: "",
  showSearch: true
};
