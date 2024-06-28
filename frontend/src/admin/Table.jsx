import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Table() {
  const [user, setUser] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Function to load data from the API
  async function loadData() {
    let response = await axios.get('http://localhost:3000/api/products');
    setUser(response.data);
  }

  // Load data when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Function to handle the delete action
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsPopupVisible(true);
  };

  // Function to confirm deletion
  const handleConfirm = async () => {
    if (deleteId) {
      await axios.delete(`http://localhost:3000/api/productDelete/${deleteId}`);
      setIsPopupVisible(false);
      setDeleteId(null);
      loadData(); // Reload data after deletion
    }
  };

  // Function to cancel deletion
  const handleCancel = () => {
    setIsPopupVisible(false);
    setDeleteId(null);
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Product Brand</th>
                      <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">Product Type</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Product Rating</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Product Price</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {user.map((data, key) => (
                      <tr key={key}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`http://localhost:3000/${data.productImage}`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{data.productBrand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{data.productType}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{data.productRating}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">{data.productPrice}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <Link to={`/admin/view/${data.id}`} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View</Link>
                          <button onClick={() => handleDeleteClick(data.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                          <Link to={`/admin/update/${data.id}`} className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Update</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-end space-x-4">
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">No</button>
                <button onClick={handleConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Yes</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
