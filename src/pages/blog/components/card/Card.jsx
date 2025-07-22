import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 mt-15"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-gray-700 text-sm flex-grow line-clamp-3">
            {blog.description}
          </p>
        </div>

        {/* Category */}
        <div className="px-4 pb-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {blog.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
