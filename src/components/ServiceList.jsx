// "use client";

// import { getAllServiceCategories, getServicesByCategory } from "@/data/homeservices";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// const ServiceList = () => {
//     const searchParams = useSearchParams();
//     const category = searchParams.get("category");

//     const categories = getAllServiceCategories();
    
//     let categoryServices = {};
//     if (category) {
//         categoryServices[category] = getServicesByCategory(category);
//     } else {
//         categories.forEach(cat => {
//             categoryServices[cat] = getServicesByCategory(cat);
//         });
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 ">
//             <div className="bg-white dark:bg-gray-800 p-6 w-full max-w-5xl rounded-xl">
//                 {/* Responsive Heading */}
//                 <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 dark:text-gray-300 break-words">
//                     SERVICE CATEGORIES
//                 </h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {categories.map((cat) => (
//                         <Link key={cat} href={`/homeservices/category/services?category=${encodeURIComponent(cat)}`}>
//                             <div className="w-full dark:bg-gray-700 shadow-md rounded-2xl p-4 sm:p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col h-full">
//                                 <h2 className="text-xl font-semibold  dark:text-gray-300 mb-2 sm:mb-4">
//                                     {cat}
//                                 </h2>
//                                 {/* No Scrollbar on Large Screens & Equal Height */}
//                                 <div className="flex-grow">
//                                     {categoryServices[cat].map((service) => (
//                                         <p key={service.name} className=" dark:text-gray-400 text-sm sm:text-base">
//                                             {service.name}
//                                         </p>
//                                     ))}
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServiceList;

"use client";

import { getAllServiceCategories, getServicesByCategory } from "@/data/homeservices";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
};

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
};

const ServiceList = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const categories = getAllServiceCategories();
    const categoryServices = new Map();
    
    if (category) {
        categoryServices.set(category, getServicesByCategory(category));
    } else {
        categories.forEach(cat => {
            categoryServices.set(cat, getServicesByCategory(cat));
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <motion.div 
                className="bg-white dark:bg-gray-800 p-6 w-full max-w-5xl rounded-xl shadow-lg"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 
                    className="text-2xl sm:text-3xl font-bold text-center mb-6 dark:text-gray-200 break-words"
                    variants={titleVariants}
                >
                    SERVICE CATEGORIES
                </motion.h1>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants}
                >
                    {[...categoryServices.keys()].map((cat, index) => (
                        <Link key={cat} href={`/homeservices/category/services?category=${encodeURIComponent(cat)}`}>
                            <motion.div 
                                className="w-full bg-white dark:bg-gray-700 shadow-md rounded-2xl p-4 sm:p-6 text-center flex flex-col h-full"
                                variants={cardVariants}
                                whileHover="hover"
                                initial="hidden"
                                animate="visible"
                                custom={index}
                            >
                                <motion.h2 
                                    className="text-xl font-semibold dark:text-gray-300 mb-2 sm:mb-4"
                                    layoutId={`title-${cat}`}
                                >
                                    {cat}
                                </motion.h2>
                                <motion.div 
                                    className="flex-grow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {categoryServices.get(cat).map((service, serviceIndex) => (
                                        <motion.p 
                                            key={service.name} 
                                            className="dark:text-gray-400 text-sm sm:text-base"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * serviceIndex }}
                                        >
                                            {service.name}
                                        </motion.p>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ServiceList;