// import React from 'react'
// import { Link } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
// import '../../index.css'

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
//         <div className="container-fluid">
//             <Link to={"/"}>
//                 <span className='pet-color'>Re-Paw-Sitory</span>
//             </Link>
//             <button
//                 className='navbar-toggler'
//                 type='button'
//                 data-bs-toggle='collapse'
//                 data-bs-target="#navbarScroll"
//                 aria-controls='navbarScroll'
//                 aria-expanded="false"
//                 aria-label='Toggle Navigation'
//             >
//                 <span className='navbar-toggler-icon'></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarScroll">
// 					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
// 						<li className="nav-item">
// 							<NavLink className="nav-link" aria-current="page" to={"/browse-all-pets"}>
// 								Browse All Pets
// 							</NavLink>
// 						</li>
// 						<li className="nav-item">
// 							<NavLink className="nav-link" aria-current="page" to={"/admin"}>
// 								Admin
// 							</NavLink>
// 						</li>
// 					</ul>

//                     <ul className="d-flex navbar-nav">

//                         <li className="nav-item">
// 							<NavLink className="nav-link" to={"/"}>
// 								Find my Adoption
// 							</NavLink>
// 						</li>

//                         <li className="nav-item dropdown">
// 							<ul>
// 								<li>
//                                     <Link to={"/"} className='dropdown-item'>
//                                         Login
//                                     </Link>
//                                 </li>
// 								<li>
//                                     <Link to={"/"} className='dropdown-item'>
//                                         Profile
//                                     </Link>
//                                 </li>
// 								<li>
//                                     <Link to={"/"} className='dropdown-item'>
//                                         Logout
//                                     </Link>
//                                 </li>
// 							</ul>
// 						</li>
//                     </ul>
//             </div>
//         </div>
//     </nav>
//   )
// }

// export default Navbar