import React, { useState, useEffect } from "react";
import axios from "axios";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setquery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setCountries(result.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, countries]);

  if (loading) {
    return <p className="Loading">Loading...</p>;
  }

  return (
    <>
      <header>
        <h1>List of Countries</h1>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setquery(e.target.value)}
        />
      </header>

      <section className="grid">
        {filteredCountries.map((country) => {
          const { name, population, region, capital, flag } = country;

          return (
            <div>
              <img src={flag} alt={name} />
              <div className="details">
                <h3 className="country-name">{name}</h3>
                <h4>Population: {population}</h4>
                <h4>Region: {region} </h4>
                <h4>Capital: {capital}</h4>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Countries;
