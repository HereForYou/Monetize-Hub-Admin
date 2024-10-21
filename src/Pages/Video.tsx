import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../data";

const Video = () => {
  const [setting, setSetting] = useState<any>({});
  const [newVideo, setNewVideo] = useState({
    title: "",
    link: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const addVideo = async () => {
    if (newVideo.link !== "" && newVideo.title !== "") {
      axios.post(ENDPOINT + "/api/setting/add", newVideo).then((res) => {
        console.log("This is add response", res.data);
        setSetting(res.data);
        setNewVideo({
          title: "",
          link: "",
        });
      });
    } else {
      setError("Fill all fields!");
    }
  };

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

  const removeVideo = (index: number) => {
    axios.post(ENDPOINT + "/api/setting/remove", { index: index }).then((res) => {
      console.log("This is add response", res.data);
      setSetting(res.data);
    });
  };

  return (
    <div className=''>
      <table className='w-full border border-slate-700'>
        <thead className=''>
          <tr className=''>
            <th className='text-lg w-1/12 p-2 hidden sm:block'>Index</th>
            <th className='text-lg w-3/12 text-left pl-2'>Title</th>
            <th className='text-lg w-8/12 sm:w-7/12 pl-2'>Link</th>
            <th className='text-lg w-1/12'></th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {setting?.taskList?.map((item: any, index: number) => (
            <tr className='w-full odd:bg-slate-200 text-sm sm:text-lg' key={item.id}>
              <td className='text-center w-1/12 p-2 hidden sm:block'>{index + 1}</td>
              <td className='text-left w-3/12 pl-2'>{item?.title}</td>
              <td className='text-left w-8/12 sm:w-7/12 pl-2 break-words'>
                <a href={item?.link}>{item?.link}</a>
              </td>
              <td
                className='text-left w-1/12 text-red-400 font-extrabold hover:text-red-800'
                onClick={() => removeVideo(index)}>
                <X size={16} />
              </td>
              {/* <img src={item.image} alt={item.id} /> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex gap-5 justify-center items-center mt-2 w-full'>
        <p>Title</p>
        <input
          className='focus:w-full border border-slate-500 py-1 rounded-lg transition-all duration-300 w-full pl-2'
          value={newVideo.title}
          name='title'
          onChange={(e) => setNewVideo({ ...newVideo, [e.target.name]: e.target.value })}
        />
      </div>
      <div className='flex gap-5 justify-center items-center mt-2 w-full'>
        <p>Link</p>
        <input
          className='focus:w-full border border-slate-500 py-1 rounded-lg w-full transition-all duration-300 pl-2'
          value={newVideo.link}
          name='link'
          onChange={(e) => setNewVideo({ ...newVideo, [e.target.name]: e.target.value })}
        />
      </div>
      <button className='py-1 bg-green-500 text-white w-full mt-2' onClick={() => addVideo()}>
        Add
      </button>
      {error !== "" && (
        <p className='bg-red-500 bg-opacity-30 border border-red-700 px-32 py-2 mt-2 flex justify-center'>{error}</p>
      )}
    </div>
  );
};

export default Video;
