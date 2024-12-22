import { useState, useEffect } from "react";
import React from "react";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const jData = await response.json();
        setData(jData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const editUser = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
    });
  };

  // Handle form submission (Add or Update user)
  const SubmitHandler = () => {
    if (form.id === null) {
      // Add new user
      setData([...data, { ...form, id: data.length + 1 }]);
    } else {
      // Update existing user
      setData((prevData) =>
        prevData.map((item) =>
          item.id === form.id ? { ...item, ...form } : item
        )
      );
    }

    setForm({
      id: null,
      name: "",
      username: "",
      email: "",
    });
  };

  return (
    <div>
      <div className="bg-slate-600">
        <form className="grid justify-center border-black">
          <input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            value={form.name}
            className="mb-2 px-2 py-1"
          />
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Username"
            value={form.username}
            className="mb-2 px-2 py-1"
          />
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            value={form.email}
            className="mb-2 px-2 py-1"
          />
          <button
            type="button"
            className="bg-black text-white px-4 py-2"
            onClick={SubmitHandler}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="relative overflow-x-auto mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Delete</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td>
                  <button onClick={() => deleteUser(item.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => editUser(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
