const FilterPanel = ({ filters, setFilters }) => {
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
  const statuses = ['all', 'available', 'exchanged'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? '' : e.target.value })}
            className="input-field"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condition
          </label>
          <select
            value={filters.condition || ''}
            onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
            className="input-field"
          >
            <option value="">All Conditions</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Filter by location"
            value={filters.location || ''}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <button
        onClick={() => setFilters({})}
        className="mt-4 btn-secondary"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
