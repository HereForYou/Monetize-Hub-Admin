import { useState, useEffect } from "react";
import { ENDPOINT } from "./data";
import "./App.css";
import axios from "axios";

function App() {
  const [setting, setSetting] = useState<any>({});
  const [newVideo, setNewVideo] = useState({
    title: "",
    link: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await axios
      .get(ENDPOINT + "/api/setting/all", {
        headers: {
          "ngrok-skip-browser-warning": "true", // or any value you prefer
        },
      })
      .then((res) => {
        console.log("Before set");
        setSetting(res.data);
        console.log("After set", res.data);
      })
      .catch((err) => console.log("Error while get setting data from backend", err));
  };

  const addVideo = async () => {
    axios.post(ENDPOINT + "/api/setting/add", newVideo).then((res) => {
      console.log("This is add response", res.data);
      setSetting(res.data);
      setNewVideo({
        title: "",
        link: "",
      });
    });
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const joinAsAdmin = () => {
    if (password === "smartfox") setIsVerified(true);
    else setError("Invalid password");
  };

  return (
    <div className='w-screen p-10 h-screen'>
      {isVerified ? (
        <table className='w-full border border-slate-700 p-10'>
          <thead className='w-full'>
            <tr className='w-full'>
              <th className='text-lg w-1/12 p-2'>Index</th>
              <th className='text-lg w-3/12 text-left pl-2'>Title</th>
              <th className='text-lg w-7/12'>Link</th>
              <th className='text-lg w-full'>Link</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {setting?.taskList?.map((item: any, index: number) => (
              <tr className='w-full odd:bg-slate-200' key={item.id}>
                <td className='text-lg text-center w-1/12 p-2'>{index + 1}</td>
                <td className='text-lg text-left w-3/12 pl-2'>{item?.title}</td>
                <td className='text-lg text-left w-7/12'>
                  <a href={item?.link}>{item?.link}</a>
                </td>
                <td className='text-lg text-left'></td>
                {/* <img src={item.image} alt={item.id} /> */}
              </tr>
            ))}
            <tr className='w-full odd:bg-slate-200'>
              <td className='text-2xl font-extrabold text-center p-2'>+</td>
              <td className='text-lg text-left w-3/12 px-2'>
                <input
                  className='focus:w-full border border-slate-500 py-1 rounded-lg w-1/2 transition-all duration-300'
                  value={newVideo.title}
                  name='title'
                  onChange={(e) => setNewVideo({ ...newVideo, [e.target.name]: e.target.value })}
                />
              </td>
              <td className='text-lg text-left w-7/12'>
                <input
                  className='focus:w-full border border-slate-500 py-1 rounded-lg w-2/3 transition-all duration-300'
                  value={newVideo.link}
                  name='link'
                  onChange={(e) => setNewVideo({ ...newVideo, [e.target.name]: e.target.value })}
                />
              </td>
              <td className='text-lg w-1/12 text-center py-2'>
                <button className='py-1 bg-green-500 text-white' onClick={() => addVideo()}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className='w-full h-full justify-center items-center flex flex-col gap-5'>
          <div className='flex gap-10 justify-center items-center'>
            <p>Password</p>
            <input
              name='password'
              className='border border-slate-400 px-4 py-2'
              value={password}
              type='password'
              onChange={(e) => onChangePassword(e)}
            />
            <button onClick={() => joinAsAdmin()}>Join</button>
          </div>
          {error !== "" && <p className="bg-red-500 bg-opacity-30 border border-red-700 px-32 py-2">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
