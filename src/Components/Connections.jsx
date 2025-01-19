import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
    const [matches, setMatches] = useState([]);

    const fetchMatchedUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            setMatches(res.data.data);
        } catch (error) {
            console.error("Error fetching matched users:", error);
        }
    };

    useEffect(() => {
        fetchMatchedUsers();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center p-5">
            <h2 className="text-3xl font-bold my-4">Your Matches...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {matches.map((match) => (
                    <div key={match._id} className="card w-80 bg-base-100 shadow-md">
                        <div className="card-body">
                            <h3 className="card-title">{match.fName} {match.lName}</h3>
                            <p className="text-gray-500">Age: {match.age}</p>
                            <p className="text-gray-500">Gender: {match.gender}</p>
                            <div className="mt-3">
                                <h4 className="text-lg font-semibold">Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {match.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-primary badge-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-primary btn-sm">Chat</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;
