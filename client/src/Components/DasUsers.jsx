import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck, FaTrash, FaUser, FaCrown, FaCalendarAlt, FaEnvelope, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { BsExclamationCircle } from "react-icons/bs";
import { motion } from "framer-motion";

export default function DasUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  console.log(users);

  const [showModal,setShowModal] = useState(false);
  const [deleteUserId,setdeleteUserId] = useState(null);
  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setUsers(data.users);
        }
      };
      if (currentUser.isAdmin) getUsers();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleDelete = async () => {

    try {
      const res = await fetch(`/api/user/delete/${deleteUserId}`, { method: "DELETE" });
      const data = await res.json();
      setShowModal(false);
      if (res.ok) {
        setdeleteUserId(null);
        setUsers((prev) => prev.filter((user) => user._id !== deleteUserId)); // Remove user from state
      } else {
        console.error("Error deleting user:", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser.isAdmin && (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <FaUsers className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage all registered users and their permissions</p>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FaUser className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {users.filter(user => user.isAdmin).length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <FaCrown className="text-xl text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Regular Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {users.filter(user => !user.isAdmin).length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FaUser className="text-xl text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Users Table */}
          {users.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <Table hoverable className="min-w-full">
                  <Table.Head className="bg-gray-50 dark:bg-gray-700">
                    <Table.HeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-sm" />
                        Date Created
                      </div>
                    </Table.HeadCell>
                    <Table.HeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-sm" />
                        User
                      </div>
                    </Table.HeadCell>
                    <Table.HeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-sm" />
                        Email
                      </div>
                    </Table.HeadCell>
                    <Table.HeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      <div className="flex items-center gap-2">
                        <FaCrown className="text-sm" />
                        Admin Status
                      </div>
                    </Table.HeadCell>
                    <Table.HeadCell className="text-gray-700 dark:text-gray-300 font-semibold text-center">
                      Actions
                    </Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
                    {users.map((user, id) => (
                      <Table.Row
                        key={id}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Table.Cell className="text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-xs text-gray-400" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </Table.Cell>
                        
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <Avatar 
                              alt="User" 
                              img={user.profilePicture || "./profile.png"} 
                              size="md"
                              rounded
                              className="ring-2 ring-gray-200 dark:ring-gray-600"
                            />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">User ID: {user._id.slice(-8)}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        
                        <Table.Cell className="text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-xs text-gray-400" />
                            <span className="truncate max-w-xs">{user.email}</span>
                          </div>
                        </Table.Cell>
                        
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            {user.isAdmin === true ? (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                                <FaCrown className="text-xs" />
                                Admin
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                                <FaUser className="text-xs" />
                                User
                              </div>
                            )}
                          </div>
                        </Table.Cell>
                        
                        <Table.Cell className="text-center">
                          <Button
                            onClick={() => { setdeleteUserId(user._id); setShowModal(true); }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                            size="sm"
                          >
                            <FaTrash className="text-sm" />
                            Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-12 text-center"
            >
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-fit mx-auto mb-6">
                <FaUsers className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Users Found</h3>
              <p className="text-gray-600 dark:text-gray-400">There are no registered users in the system yet.</p>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
            className="backdrop-blur-sm"
          >
            <Modal.Header className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <BsExclamationCircle className="text-xl text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Confirm User Deletion</h3>
              </div>
            </Modal.Header>
            <Modal.Body className="bg-white dark:bg-gray-800">
              <div className="text-center py-6">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto mb-4">
                  <FaTrash className="text-3xl text-red-600 dark:text-red-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Are you sure?</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This action cannot be undone. The user will be permanently deleted from the system.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    color="failure" 
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <FaTrash className="text-sm" />
                    Yes, Delete User
                  </Button>
                  <Button 
                    onClick={() => { setdeleteUserId(null); setShowModal(false); }} 
                    color="gray"
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </motion.div>
      </div>
    )
  );
}
