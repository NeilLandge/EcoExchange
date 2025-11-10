# EcoExchange - Community Reuse Platform

<p align="center">
  <img src="frontend/public/logo.svg" width="120" alt="EcoExchange Logo"/>
  <br>
  <img src="https://www.mongodb.com/assets/images/global/favicon.ico" width="26" title="MongoDB" />
  <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" width="26" title="Express.js" />
  <img src="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png" width="26" title="React" />
  <img src="https://nodejs.org/static/images/logo.svg" width="26" title="Node.js" />
</p>

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that promotes sustainability by enabling users to list and exchange unused items within their community.

**Developer:** Neil Landge  
**Email:** neillandge5gmail.com  
**GitHub:** [https://github.com/NeilLandge](https://github.com/NeilLandge)

---

## Features

### Core Features
- **Add Items:** Create listings with name, image, condition, location, and description
- **Items Board:** Browse all available items with an intuitive grid layout
- **Search & Filter:** Find items by name, description, condition, location, and status
- **Status Toggle:** Mark items as 'Available' or 'Exchanged'
- **Responsive Design:** Fully responsive UI that works on all devices

### Bonus Features
- **Image Upload:** Support for both base64 encoding and Cloudinary integration
- **Pagination:** Efficient browsing with paginated results
- **Real-time Updates:** Instant UI updates when item status changes
- **Advanced Filtering:** Multiple filter options for refined searches
- **Modern UI/UX:** Clean, professional design with Tailwind CSS

---

## Tech Stack

### Frontend
- **React 18**
- **Vite**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **React Icons**
- **React Toastify**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Cloudinary**
- **Multer**

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (optional, for image uploads)

### Backend Setup
1. Navigate to backend folder:
    ```
    cd backend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. Create `.env` file:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/ecoexchange
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4. Start the server:
    ```
    npm run dev
    ```
Server runs on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend folder:
    ```
    cd frontend
    ```
2. Install dependencies:
    ```
    npm install
    ```
3. (Optional) Create `.env` file:
    ```
    VITE_API_URL=http://localhost:5000/api
    ```
4. Start the development server:
    ```
    npm run dev
    ```
Application runs on `http://localhost:3000`

---

## API Endpoints

### Items
- `GET /api/items` — Get all items (with pagination and filters)
- `GET /api/items/:id` — Get single item
- `POST /api/items` — Create new item
- `PUT /api/items/:id` — Update item status
- `DELETE /api/items/:id` — Delete item

### Query Parameters
- `status` — Filter by status (available/exchanged)
- `search` — Search by name or description
- `condition` — Filter by condition
- `location` — Filter by location
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

---

## Project Structure

ecoexchange/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── itemController.js
│ ├── models/
│ │ └── Item.js
│ ├── routes/
│ │ └── items.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ │ ├── ItemCard.jsx
│ │ ├── SearchBar.jsx
│ │ ├── FilterPanel.jsx
│ │ ├── Navbar.jsx
│ │ └── Pagination.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── AddItem.jsx
│ │ └── ItemDetails.jsx
│ ├── services/
│ │ └── api.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json

text

---

## Screenshots

### Home Page
![Home Page - Items Grid with search and filters](frontend/public/home-screenshot.png)

### Add Item Page
![Add Item Form with image upload](frontend/public/additem-screenshot.png)

### Item Details
![Detailed item view with all information](frontend/public/itemdetails-screenshot.png)

---

## Deployment

### Frontend Deployment (Vercel)
1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/).
3. Set build command to: `npm run build`.
4. Set output directory to: `dist`.
5. Add environment variable: `VITE_API_URL=https://your-backend-url/api`.
6. Deploy and access your frontend URL.

### Backend Deployment (Render)
1. Push your code to GitHub.
2. Create a new Web Service on [Render](https://render.com/) linked to your GitHub repo.
3. Set build command: `npm install`.
4. Set start command: `npm run start` or `npm run dev`.
5. Add environment variables:
PORT=5000
MONGODB_URI=<your mongodb connection string>
CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
CLOUDINARY_API_KEY=<your cloudinary api key>
CLOUDINARY_API_SECRET=<your cloudinary api secret>

text
6. Deploy and obtain your backend URL for the frontend.

Make sure to update your frontend's `VITE_API_URL` with your backend deployment URL and redeploy.

---

## Future Enhancements
- User authentication and profiles
- Real-time chat between users
- Email notifications
- Map integration for location
- Item categories and tags
- Wishlist functionality
- Review and rating system

---

## License
MIT License

---

## Contact
For any queries, reach out to:
- **Email:** neillandge5gmail.com
- **GitHub:** [https://github.com/NeilLandge](https://github.com/NeilLandge)