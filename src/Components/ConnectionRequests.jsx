import React from 'react';

const ConnectionRequests = () => {
    const [User, setUser] = React.useState({
        fName: "Ayush",
        gender: "Male",
        age: "24",
        skills: ["Javascript", "Node", "React"]
    });

    const handleConnectionRequest = (async (props, id) => {
        console.log(props);
    });

    return (
        <div className="h-full flex justify-center">
            <div className="lg:w-1/4 w-full flex flex-col bg-black rounded-lg shadow-md">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_mjW-rvOfpg1q3Lum1d4HbvOIFhrSidaaA&s"
                    alt="user"
                    className="w-full h-80 object-fill rounded-t-lg"
                />
                <div className="p-4 flex px-2">
                    <p className="text-xl font-bold capitalize">{`${User?.fName} has sent you a connection Request `}</p>
                    <p>
                        <h2 className="text-xl capitalize">{User?.gender + " " + `(${User?.age})`}</h2>
                    </p>
                </div>
                <p className="m-2 ">
                    <b>Skills:</b> {User?.skills.join(', ')}
                </p>
                <div className="flex justify-between mt-4">
                    <button
                        className="btn btn-error"
                        onClick={() => handleConnectionRequest("accept", feed.data[currentIndex]?._id)}
                    >
                        Accept
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => handleConnectionRequest("reject", feed.data[currentIndex]?._id)}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConnectionRequests;
