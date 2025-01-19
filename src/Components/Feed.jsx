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
                             src={
                                feed.data[currentIndex]?.gender.toLowerCase() === "male"
                                    ? 'https://www.google.com/imgres?q=male%20with%20computer%20ai%20images&imgurl=https%3A%2F%2Fimgcdn.stablediffusionweb.com%2F2024%2F2%2F24%2Ff03b1e4b-1852-4d5a-b31c-09d81a85fa95.jpg&imgrefurl=https%3A%2F%2Fstablediffusionweb.com%2Fimage%2F1651913-brown-haired-male-hacker-on-computer&docid=26J9WxIOO5KOZM&tbnid=EKAkAqe56Kp6sM&vet=12ahUKEwju35XUkIGLAxW_wzgGHeevDgEQM3oECCUQAA..i&w=1024&h=1024&hcb=2&ved=2ahUKEwju35XUkIGLAxW_wzgGHeevDgEQM3oECCUQAA'
                                    : 'data:image/jpeg;base64,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'
                            }
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
