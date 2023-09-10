"use client"


import { useState } from "react";

export default function Home() {

  const [data, setData] = useState([])
  const [userName, setUserName] = useState()

  const handleChange = (e) => {
    setUserName(e.target.value)
    console.log(userName);
  };

  const handleGet = async () => {

    const link = await fetch(`https://api.github.com/users/${userName}`, {
      method: "GET"
    });

    if (!link.ok) {
      alert("User not found");
      setUserName('')
      return
    }

    const userData = await link.json();
    console.log(userData);
    setData([...data, userData])
    setUserName("");

  }

  const deleteHandler = (html_url) => {
    console.log("URL", html_url);
    let restUser = data.filter((data) => {
      if (data.html_url !== html_url) {
        return data
      }
    })
    console.log("restUser", restUser);
    setData(restUser)
  }

  return (
    <>

      <div className="text-center mt-5">
        <h1 className="py-5 text-4xl font-bold text-[#183468]">GitHub Data From Rest API</h1>
      </div>

      <div className="text-center py-5">
        <input
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-700"
          type="text"
          placeholder="Enter GitHub UserName"
          value={userName}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleGet}
          className="bg-[#183468] hover:bg-[#3e5e99] text-white font-bold py-2 px-12 rounded">
          Get Data
        </button>
      </div>

      <div class="relative overflow-x-auto p-6">
        <table class="w-full text-sm text-left">
          <thead class="text-md text-black font-bold">
            <tr className="border-b border-black">
              <th scope="col" class="px-6 py-5">
                #
              </th>
              <th scope="col" class="px-6 py-5">
                Profile
              </th>
              <th scope="col" class="px-6 py-5">
                Name
              </th>
              <th scope="col" class="px-6 py-5">
                Followers
              </th>
              <th scope="col" class="px-6 py-5">
                Following
              </th>
              <th scope="col" class="px-6 py-5">
                Github
              </th>
              <th scope="col" class="px-6 py-5">
                <span class="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <>
                  <tr class="border-b border-gray-400 text-gray-100">
                    <th scope="col" class="px-6 py-3">
                      {i + 1}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <img src={item.avatar_url} className="rounded-full" alt="profile picture" width={70} height={70} />
                    </th>
                    <th scope="col" class="px-6 py-3">
                      {item.name}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      {item.followers}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      {item.following}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <a href={item.html_url} target="_blank">{item.html_url}</a>
                      {/* {item.html_url} */}
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <button onClick={() => deleteHandler(item.html_url)} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </th>
                  </tr>
                </>
              )
            })
            }
          </tbody>
        </table>
      </div>

    </>
  )
}
