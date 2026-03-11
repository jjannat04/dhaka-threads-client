Dhaka Threads | Frontend Architecture
A high-end, editorial-inspired e-commerce interface developed with React.js. This project focuses on sophisticated UI/UX design, modular component architecture, and efficient state management to deliver a premium boutique shopping experience.

View Live Demo: https://dhaka-threads-client.vercel.app/
Backend Repository: https://github.com/jjannat04/dhaka-threads-backend

Technical Overview
The frontend is engineered to bridge the gap between traditional retail platforms and high-fashion digital experiences. It utilizes modern CSS techniques and React’s functional paradigm to ensure performance and scalability.

Core Features
Editorial Hero Engine: A custom-built, dynamic carousel with optimized transition logic and mobile-responsive text scaling.
Global State Management: Implemented via React Context API to synchronize Cart and Wishlist states across disparate routes without performance degradation.
Responsive Layout Logic: Utilizes a hybrid grid/flexbox system that adapts layout structures (e.g., sticky sidebars vs. stacked components) based on viewport analysis.
Asynchronous Discovery: A seamless filtering system integrated with RESTful endpoints to allow real-time product sorting by attributes such as size, color, and category.
Secure Authentication Flow: Fully integrated with JWT-based backend protocols to manage protected routes and authenticated user actions.

Technology Stack
Library: React 18
Routing: React Router 6
State Management: Context API
Styling: CSS3 (Advanced Grid, Flexbox, Keyframe Animations)
Data Fetching: Fetch API / Axios

Architecture Design
The project follows a modular directory structure to ensure maintainability:

/components: Reusable UI elements (Buttons, Inputs, Toasts).

/context: Global state providers for Cart and Wishlist logic.

/pages: Route-level components (Home, Products, ProductDetail, Cart).

/services: API abstraction layers for backend communication.
