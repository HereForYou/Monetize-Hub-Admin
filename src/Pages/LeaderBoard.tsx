import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../data";

const LeaderBoard = () => {
  const [allUsers, setAllUsers] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/api/user/top/admin`, {
        headers: {
          "ngrok-skip-browser-warning": "true", // or any value you prefer
        },
      })
      //   .get(`${ENDPOINT}/api/user/top/admin`)
      .then((res) => {
        console.log("friends > res.data", res.data);
        setAllUsers(res.data.topUsers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const clearPoint = (tgId: string) => {
    axios.put(`${ENDPOINT}/api/user/clear/${tgId}`).then((res) => {
      console.log("Clear Point: ", res.data);
      const data = res.data;
      if (!res.data?.length) {
        console.log("Object");
        setAllUsers((prevUsers: any[]) => {
          const index = prevUsers.findIndex((user: any) => user.tgId === data.tgId);
          if (index !== -1) {
            const updateUsers = [...prevUsers];
            updateUsers[index] = { ...data };
            return updateUsers;
          }
          return prevUsers; // Return previous state if user not found
        });
      } else {
        console.log("Array");
        setAllUsers(data);
      }
    });
  };

  return (
    <div>
      {allUsers.map((user: any) => (
        <div className='grid grid-cols-3 gap-2 sm:gap-5 items-center' key={user.tgId}>
          <p>{user?.userName}</p>
          <p className='text-center'>{user?.totalPoints}</p>
          <button className='text-sm sm:text-base' onClick={() => clearPoint(user.tgId)}>
            Clear Point
          </button>
        </div>
      ))}
      <button
        className='text-sm sm:text-base flex w-full mt-4 justify-center bg-green-400 hover:bg-green-500 hover:text-white transition-all duration-500'
        onClick={() => clearPoint("all")}>
        Clear Point
      </button>
    </div>
  );
};

export default LeaderBoard;
