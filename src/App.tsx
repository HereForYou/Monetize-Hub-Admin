import { useState } from "react";
import "./App.css";
import Video from "./Pages/Video";
import LeaderBoard from "./Pages/LeaderBoard";

function App() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<string>("video");

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onKeyDownPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") joinAsAdmin();
  };

  const joinAsAdmin = () => {
    if (password === "smartfox") setIsVerified(true);
    else setError("Invalid password");
  };

  return (
    <div className='w-full sm:p-10 p-2 h-screen'>
      {isVerified ? (
        <div>
          <div className='flex w-full justify-evenly bg-green-400 items-center py-1 mb-5'>
            <p
              className={`font-extrabold px-5 py-1 border-b-4 hover:cursor-pointer transition-all duration-300 ${
                page === "video" ? "border-orange-600" : "border-transparent"
              }`}
              onClick={() => setPage("video")}>
              Manage Video
            </p>
            <p
              className={`font-extrabold px-5 py-1 border-b-4 hover:cursor-pointer transition-all duration-300 ${
                page === "user" ? "border-orange-600" : "border-transparent"
              }`}
              onClick={() => setPage("user")}>
              Manage User
            </p>
          </div>
          {page === "video" ? <Video /> : <LeaderBoard />}
        </div>
      ) : (
        <div className='w-full h-full justify-center items-center flex flex-col gap-5'>
          <div className='flex gap-10 justify-center items-center sm:flex-row flex-col'>
            <p>Password</p>
            <input
              name='password'
              className='border border-slate-400 px-4 py-2'
              value={password}
              type='password'
              onChange={onChangePassword}
              onKeyDown={onKeyDownPassword}
            />
            <button onClick={() => joinAsAdmin()}>Join</button>
          </div>
          {error !== "" && (
            <p className='bg-red-500 bg-opacity-30 border border-red-700 px-32 py-2 flex justify-center'>{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
