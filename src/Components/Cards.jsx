

const Cards = ({ User, isEditProfile }) => {

    return (
        <div className="p-6 max-w-md w-full bg-black rounded-lg shadow-md">
            <h2 onClick={() => { isEditProfile(false) }}>Edit Profile</h2>
            <div className="h-full flex flex-col">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_mjW-rvOfpg1q3Lum1d4HbvOIFhrSidaaA&s"
                    alt="user"
                    className="w-full h-80 object-fill rounded-t-lg"
                />
                <div className="p-4 flex px-2">
                    <p className="text-xl font-bold capitalize">{User?.fName + ' ' + User?.lName + ' ' + `(${User?.age})`}</p>
                    <p>
                        <h2 className="text-xl capitalize">{User?.gender}</h2>
                    </p>
                </div>
                <p className="m-2 ">
                    <b>Skills:</b> {User?.skills.join(', ')}
                </p>
            </div>
        </div>
    );
};

export default Cards;
