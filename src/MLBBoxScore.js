import React, { useState, useEffect } from 'react';
import './MLBBoxScore.css';

import axios from 'axios';

const MLBBoxScore = () => {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/mlb');
                setGameData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch game data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching game data.</div>;
    if (!gameData) return <div>No game data available.</div>;

    return (
        <div>
            <h2>MLB Game Data</h2>
            <section className="Card BaseballLineScoreWrapper">
  <div className="Wrapper Card__Content">
    <div className="LineScore">
      <div className="ResponsiveTable ResponsiveTable--fixed-left">
        <table className="Table Table--align-center Table--fixed Table--fixed-left">
          <thead className="Table__THEAD">
            <tr className="Table__TR Table__TR--sm Table__even">
              <th className="Table__TH">Team</th>
              {Array.from({ length: 9 }).map((_, idx) => (
                <th className="Table__TH" key={idx}>{idx + 1}</th>
              ))}
              <th className="Table__TH">R</th>
              <th className="Table__TH">H</th>
              <th className="Table__TH">E</th>
            </tr>
          </thead>
          <tbody className="Table__TBODY">
            {/* Away Team Row */}
            <tr className="Table__TR Table__TR--sm Table__even">
              <td className="Table__TD">{gameData.away_team.abbreviation}</td>
              {gameData.away_period_scores.map((score, idx) => (
                <td className="Table__TD" key={idx}>{score}</td>
              ))}
              {/* Calculate and display Runs, Hits, and Errors for away team */}
              <td className="Table__TD">{gameData.away_period_scores.reduce((acc, score) => acc + score, 0)}</td>
              <td className="Table__TD">{/* Hits data not provided */}</td>
              <td className="Table__TD">{gameData.away_errors}</td>
            </tr>
            {/* Home Team Row */}
            <tr className="Table__TR Table__TR--sm Table__even">
              <td className="Table__TD">{gameData.home_team.abbreviation}</td>
              {gameData.home_period_scores.map((score, idx) => (
                <td className="Table__TD" key={idx}>{score}</td>
              ))}
              {/* Calculate and display Runs, Hits, and Errors for home team */}
              <td className="Table__TD">{gameData.home_period_scores.reduce((acc, score) => acc + score, 0)}</td>
              <td className="Table__TD">{/* Hits data not provided */}</td>
              <td className="Table__TD">{gameData.home_errors}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

        </div>
    );
};

export default MLBBoxScore;
