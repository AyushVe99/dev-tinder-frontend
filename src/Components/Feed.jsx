import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const Feed = () => {
    const feed = useSelector((store) => store?.feed?.data);
    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0); // Track the current card
    const [isSliding, setIsSliding] = useState(false); // Animation state
    const [slideDirection, setSlideDirection] = useState(""); // Direction of slide

    useEffect(() => {
        const userFeed = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/feed?page=1&limit=10`, {
                    withCredentials: true,
                });
                console.log(res);
                if (res.status === 200) {
                    dispatch(addFeed({ data: res?.data }));
                }
            } catch (error) {
                console.error('Error fetching user feed:', error);
            }
        };

        userFeed();
    }, []);

    const handleConnectionRequest = async (status, toUserId) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/request/send/${status}/${toUserId}`,
                {}, 
                { withCredentials: true }
            );
            if (res.status === 200) {
                console.log("Request Sent to", toUserId);
            }

            // Trigger slide animation
            setSlideDirection(status === "intrested" ? "right" : "left");
            setIsSliding(true);

            // Wait for animation to finish, then show the next card
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1); // Move to the next card
                setIsSliding(false); // Reset animation state
                setSlideDirection(""); // Reset direction
            }, 300); // Match the animation duration
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
            {feed && currentIndex < feed.data.length && (
                <div
                    key={feed.data[currentIndex]._id}
                    className={`absolute w-80 h-96 bg-white rounded-lg shadow-lg transition-transform duration-300 ${
                        isSliding ? (slideDirection === "right" ? "translate-x-full" : "-translate-x-full") : "translate-x-0"
                    }`}
                >
                    <div className="h-full flex flex-col">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="user"
                            className="w-full h-2/3 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold first-letter:capitalize">{feed.data[currentIndex]?.fName}</h2>
                            <p><b>SKILLS:</b> {feed.data[currentIndex]?.skills.join(", ")}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="btn btn-error"
                                    onClick={() => handleConnectionRequest("ignored", feed.data[currentIndex]?._id)}
                                >
                                    Dislike
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleConnectionRequest("intrested", feed.data[currentIndex]?._id)}
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentIndex >= feed?.data?.length && (
                <div className="text-center">
                    <h2 className="text-xl font-bold">No more users!</h2>
                </div>
            )}
        </div>
    );
};

export default Feed;
