// import Link from "next/link";
// import { auth } from "@/auth";
// import Logout from "@/components/SignOut";
// import { getUsersByEmail } from "@/queries/users";

// const Navbar = async () => {
//   const session = await auth();
//   const loggedInUser = session?.user;

//   if (!loggedInUser) {
//     return (
//       <header className="group relative bg-gray-800 text-gray-300 px-10 py-3 transition-all shadow-xl overflow-hidden">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <Link href="/">
//               <img src="/engineer.png" alt="logo" className="h-12 w-12" />
//             </Link>
//             <Link href="/">
//               <h1 className="text-3xl font-bold">FIXIT</h1>
//             </Link>
//           </div>
//           <nav>
//             <ul className="flex gap-7 text-xl font-medium">
//               <Link href="/signin">SignIn</Link>
//               <Link href="/signup">SignUp</Link>
//               <Link href="/contact">Contact</Link>
//             </ul>
//           </nav>
//         </div>
//       </header>
//     );
//   }

//   const user = await getUsersByEmail(loggedInUser.email);
//   const profileLink = user?.service ? "/profile_em" : "/profile_cu";

//   return (
//     <header className="group relative bg-gray-800 text-gray-300 px-10 py-3 transition-all shadow-xl overflow-hidden">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Link href="/">
//             <img src="/engineer.png" alt="logo" className="h-12 w-12" />
//           </Link>
//           <Link href="/">
//             <h1 className="text-3xl font-bold">FIXIT</h1>
//           </Link>
//         </div>
//         <div >
//           <ul className="flex items-center gap-5 text-lg font-medium">
//             <Link href={profileLink} className="hover:opacity-80">
//               <img src="/user.png" alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-400 bg-gray-700" />
//             </Link>
//             <Logout />
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import Link from "next/link";
import { auth } from "@/auth";
import Logout from "@/components/SignOut";
import { getUsersByEmail } from "@/queries/users";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return (
      <header className="sticky top-0 z-50 bg-gray-800 text-gray-300 px-6 md:px-10 py-4 shadow-lg border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 transition-transform hover:scale-105">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/engineer.png" 
                alt="logo" 
                className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-md" 
              />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">FIXIT</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex gap-4 md:gap-7 items-center">
              <li>
                <Link 
                  href="/signin" 
                  className="text-lg md:text-xl font-medium py-2 px-3 rounded-md transition-all hover:bg-gray-700 hover:text-gray-100"
                >
                  SignIn
                </Link>
              </li>
              <li>
                <Link 
                  href="/signup" 
                  className="text-lg md:text-xl font-medium py-2 px-3 rounded-md transition-all hover:bg-gray-700 hover:text-gray-100"
                >
                  SignUp
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-lg md:text-xl font-medium py-2 px-3 rounded-md transition-all hover:bg-gray-700 hover:text-gray-100"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  const user = await getUsersByEmail(loggedInUser.email);
  const profileLink = user?.service ? "/profile_em" : "/profile_cu";

  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-gray-300 px-6 md:px-10 py-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 transition-transform hover:scale-105">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/engineer.png" 
              alt="logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-md" 
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">FIXIT</h1>
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            <li>
              <Link 
                href={profileLink} 
                className="transition-transform hover:scale-110 focus:scale-110"
              >
                <img 
                  src="/user.png" 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full border-2 border-gray-400 bg-gray-700 object-cover shadow-md hover:border-gray-300 transition-all" 
                />
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

