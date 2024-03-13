import React, { useState, useEffect } from 'react';
import './NBABoxScore.css'; 

import axios from 'axios';

const NBABoxScore = () => {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/nba');
                setGameData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch game data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching game data.</div>;
    if (!gameData) return <div>No game data available.</div>;

    return (
        <div>
            <h2>NBA Game Data</h2>
            <div className="team-info">
                <h3>{gameData.away_team.full_name} vs {gameData.home_team.full_name}</h3>
            </div>
            <section className="Card NBABoxScoreWrapper">
                <div className="Wrapper Card__Content">
                    <div className="BoxScore">
                        <div className="ResponsiveTable">
                            <table className="Table Table--align-center">
                                <thead>
                                    <tr>
                                        <th>Quarter</th>
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <th key={idx}>{idx + 1}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{gameData.away_team.abbreviation}</td>
                                        {gameData.away_period_scores.map((score, idx) => (
                                            <td key={idx}>{score}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>{gameData.home_team.abbreviation}</td>
                                        {gameData.home_period_scores.map((score, idx) => (
                                            <td key={idx}>{score}</td>
                                        ))}
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

export default NBABoxScore;
