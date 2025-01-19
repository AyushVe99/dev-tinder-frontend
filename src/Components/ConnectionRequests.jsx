import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const ConnectionRequests = () => {
    const userData = useSelector((store) => store?.user?.data);
    const [connectionRequests, setConnectionRequests] = useState([]);
    const [removingId, setRemovingId] = useState(null);

    // Fetch connection requests from the API
    const viewConnectionRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests`, { withCredentials: true });
            setConnectionRequests(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConnectionRequest = async (action, id) => {
        try {
            setRemovingId(id);
            await axios.post(
                `${BASE_URL}/request/review/${action}/${id}`,
                {},
                { withCredentials: true }
            );
            setTimeout(() => {
                setConnectionRequests((prevRequests) =>
                    prevRequests.filter((request) => request.fromUserId._id !== id)
                );
                setRemovingId(null); 
            }, 500); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        viewConnectionRequests();
    }, []);

    return (
        <div className="h-full w-full stack mt-4">
            {connectionRequests.length > 0 ? (
                connectionRequests.map((request, index) => (
                    <div
                        key={request._id}
                        className={`lg:w-1/4 bg-black rounded-lg shadow-md overflow-hidden ${
                            removingId === request._id ? 'fade-out' : ''
                        }`}
                    >
                        <img
                            src={
                                request.fromUserId.gender.toLowerCase() === 'male'
                                    ? 'https://files.oaiusercontent.com/file-BYqi2C4bca4w1RSaFhmhRX?se=2025-01-18T15%3A22%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4372b108-5b25-4308-a9e6-395ed3f49ecd.webp&sig=ynLzwl6PCZwmrF9xw4E5hB6k6/fGlxCdtfqNrLlgY1g%3D'
                                    : 'https://files.oaiusercontent.com/file-YCFs6hrSEVMtdSgHJ3KiN6?se=2025-01-18T15%3A22%3A30Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Deb60bcb9-87d2-4379-9a7a-5db45702a206.webp&sig=tG3lcPXx3HjfSLs01zkLK21T0gx9E8dU4wqQ6w/YFdc%3D'
                            }
                            alt="user"
                            className="w-full h-80 object-fill rounded-t-lg"
                        />
                        <div className="p-4 flex px-2">
                            <p className="text-xl font-bold capitalize">
                                {`${request.fromUserId.fName} has sent you a connection Request`}
                            </p>
                            <br />
                            <p>
                                <h2 className="text-xl capitalize">
                                    {request.fromUserId.gender + ` (${request.fromUserId.age})`}
                                </h2>
                            </p>
                        </div>
                        <p className="m-2">
                            <b>Skills:</b> {request.fromUserId.skills.join(', ')}
                        </p>
                        <div className="flex justify-between mt-4 p-4">
                            <button
                                className="btn btn-error"
                                onClick={() => handleConnectionRequest('accepted', request.fromUserId._id)}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => handleConnectionRequest('rejected', request.fromUserId._id)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg">No new connection requests</p>
            )}
        </div>
    );
};

export default ConnectionRequests;
