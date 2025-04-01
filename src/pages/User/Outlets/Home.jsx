import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  People,
  BarChart,
  Star,
  CheckCircleOutline,
} from "@mui/icons-material";
// import NavbarHome from "../components/User/NavbarHome";
import JobCard from "@/components/User/JobCard";
import axios from "axios";
import employerAxiosInstnce from "@/config/axiosConfig/employerAxiosInstance";
import userAxiosInstance from "@/config/axiosConfig/userAxiosInstance";
import { Button, Input } from "@mui/material";
import ImageSiderComponent from "@/components/common/image-sliderComponent";
import Navbar from "@/components/User/Navbar";
import bannerImg from '/Images/bannerImg.jpg'
import employerImg from '/Images/employer-img.jpg'
import repairImg from '/Images/mob-repair-img1.jpg'




// import {banner1} from "../../public/Images/banner1"

const images = [
  {
    url: "../../public/Images/banner-home2.webp",
    alt: "Slide 1",
  },
  {
    url: "../../public/Images/banner-home2.webp",
    alt: "Slide 2",
  },
  {
    url: "../../public/Images/banner-home2.webp",
    alt: "Slide 3",
  },
  {
    url: "../../public/Images/banner-home2.webp",
    alt: "Slide 4",
  },
];

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const { data } = await userAxiosInstance.get("/getJobPosts");
      console.log(data.jobPosts);
      setJobs(data.jobPosts);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  // const jobs = Array(8).fill({});

  if (loading) return <p>Loading</p>

  return (
    <>
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <div className="relative w-full min-h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
        <img src={bannerImg || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-20 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="mt-2 text-sm sm:text-md md:text-lg max-w-2xl font-marcellus">
            Whether you're a skilled technician or just starting out, our platform is designed to match you with job 
            opportunities tailored to your expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 sm:mt-8">
            <Link to="/sign-up" className="w-full sm:w-auto">
              <div className="rounded-lg bg-blue-500 py-3 px-6 text-center text-white transform transition-transform hover:scale-105">
                <span className="text-sm">Register as</span>
                <div className="text-lg font-semibold">Job Seeker</div>
              </div>
            </Link>

            <Link to="employer/register" className="w-full sm:w-auto">
              <div className="rounded-lg bg-blue-500 py-3 px-6 text-center text-white transform transition-transform hover:scale-105">
                <span className="text-sm">Register as</span>
                <div className="text-lg font-semibold">Employer</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

        {/* Jobs Recommended Section */}
        <div className="py-12 md:py-16 bg-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-primary text-center px-4">Jobs Recommended for You</h2>
          <div className="container mx-auto max-w-screen-xl mt-6 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-5">
              {jobs?.map((job, index) => (
                <div key={index}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>

          {/* Browse All Jobs Button */}
          <div className="mt-8 text-center">
            <Link to="/all-jobs">
              <button
                className="px-6 py-2 bg-white border border-blue-500 text-blue-500 shadow-md rounded-lg
               hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Browse All Jobs
              </button>
            </Link>
          </div>
        </div>

        {/* For Job Seekers Section */}
        <div className="py-12 md:py-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-8 lg:px-16">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">For Job Seekers</h2>
              <p className="text-gray-700 mb-4 sm:mb-6">
                Discover your next career move with our extensive job listings and personalized recommendations.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Access thousands of job listings",
                  "Create a standout profile",
                  "Get personalized job recommendations",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleOutline className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Find Jobs
              </button>
            </div>
            <div className="order-1 md:order-2 mb-4 md:mb-0">
              <img
                src={repairImg}
                alt="Job seeker using laptop"
                className="rounded-xl shadow-xl w-full h-48 sm:h-64 object-cover
                           transition-transform ease-in-out transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>

        {/* For Employers Section */}
        <div className="py-12 md:py-16 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-8 lg:px-16">
            <div className="mb-4 md:mb-0">
              <img
                src={employerImg}
                alt="Employer posting a job"
                className="rounded-xl shadow-xl w-full h-48 sm:h-64 object-cover
                           transition-transform ease-in-out transform hover:scale-105 duration-300"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">For Employers</h2>
              <p className="text-gray-700 mb-4 sm:mb-6">
                Find the perfect candidates quickly and efficiently with our advanced recruiting tools.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Post jobs and manage applications",
                  "Search our extensive candidate database",
                  "Use AI-powered matching technology",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleOutline className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Post a Job
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-12 md:py-16 bg-white">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16">
            {[
              {
                text: "JobConnect helped me find my dream job in just two weeks. The platform is user-friendly and the job recommendations were spot-on!",
                author: "Sarah T. - Software Developer",
              },
              {
                text: "As an employer, I've been impressed with the quality of candidates we've found through JobConnect. It's streamlined our hiring process significantly.",
                author: "Mark R. - HR Manager",
              },
              {
                text: "The AI-powered matching on JobConnect is a game-changer. I've never had such relevant job recommendations before!",
                author: "Emily L. - Marketing Specialist",
              },
            ].map((testimonial, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-12 md:py-16 bg-gray-50">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Why Choose JobConnect</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16">
            {[
              {
                icon: <People className="text-blue-500 text-4xl" />,
                title: "Large Talent Pool",
                description: "Access thousands of qualified candidates or job listings.",
              },
              {
                icon: <BarChart className="text-blue-500 text-4xl" />,
                title: "Advanced Matching",
                description: "Our AI-powered system ensures perfect job-candidate fits.",
              },
              {
                icon: <Star className="text-blue-500 text-4xl" />,
                title: "Top Companies",
                description: "Partner with industry-leading organizations.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white border rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm text-center mb-2">© 2024 JobConnect. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <button className="text-blue-600 hover:underline text-sm">Terms of Service</button>
            <button className="text-blue-600 hover:underline text-sm">Privacy</button>
          </div>
        </div>
      </footer>
    </>
  );
}
