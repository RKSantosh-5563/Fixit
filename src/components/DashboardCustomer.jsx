import { auth } from "@/auth";
import { getUsersByEmail } from "@/queries/users";
import { getBookingsByEmail } from "@/queries/bookings";
import { CalendarIcon, MapPinIcon, PhoneIcon, MailIcon, UserIcon } from "lucide-react";

const DashboardCustomer = async () => {
    const session = await auth();
    const loggedInUser = session?.user;

    if (!loggedInUser) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                    <div className="mb-4 text-red-400">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <p className="text-red-400 text-xl font-semibold">Sign in to view your dashboard</p>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    const user = await getUsersByEmail(loggedInUser.email);
    const bookings = await getBookingsByEmail(user.email, null);

    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Customer Dashboard</h1>
                    <div className="bg-gray-700 px-4 py-2 rounded-lg text-white">
                        <span>Welcome back, {user.username}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Section */}
                    <div className="col-span-1">
                        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                            <div className=" bg-gray-700 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <UserIcon className="w-5 h-5" />
                                    Profile
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex flex-col items-center pb-6 border-b border-gray-700">
                                    <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-indigo-400">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{user.username}</h3>
                                    <p className="text-gray-400">Customer</p>
                                </div>

                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-center gap-3">
                                        <MailIcon className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p>{user.email}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <PhoneIcon className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p>{user.phone}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <MapPinIcon className="w-5 h-5 text-indigo-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Address</p>
                                            <p>{user.street}, {user.city}, {user.state}</p>
                                        </div>
                                    </li>
                                </ul>
                                
                                <button className="w-full py-2 mt-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 h-full">
                            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5" />
                                    Your Bookings
                                </h2>
                                <div className="bg-gray-500 text-slate-100 px-3 py-1 rounded-md text-sm font-medium">
                                    {bookings.length} Bookings
                                </div> 
                            </div>
                            
                            {/* Scrollable Booking List */}
                            <div className="p-6 max-h-[490px] overflow-y-auto custom-scrollbar">
                                {bookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {bookings.map((booking, index) => (
                                            <div key={index} className="bg-gray-700 hover:bg-gray-650 border-l-4 border-gray-500 rounded-lg shadow-md transition-all duration-200 overflow-hidden">
                                                <div className="p-5">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                        <h3 className="text-lg font-medium text-gray-300">{booking.service}</h3>
                                                        <span className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full">
                                                            {new Date(booking.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="mt-4 flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                            <span className="text-sm text-gray-400">Confirmed</span>
                                                        </div>
                                                        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-20 h-20 mb-6 rounded-full bg-gray-700 flex items-center justify-center">
                                            <CalendarIcon className="w-10 h-10 text-gray-500" />
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-300 mb-2">No Bookings Yet</h3>
                                        <p className="text-gray-500 mb-6 max-w-md">You haven't made any bookings yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="mt-8 bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                <div className="px-6 py-4 bg-gray-700">
                        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Book a Service", "View History", "Contact Support", "Account Settings"].map((action, index) => (
                                <button 
                                    key={index}
                                    className="flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-650 p-4 rounded-lg transition-colors"
                                >
                                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-sm text-center text-gray-300">{action}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCustomer;