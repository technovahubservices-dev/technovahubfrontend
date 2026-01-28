import React, { useState } from 'react';
import {
    Brain,
    Gamepad,
    Globe,
    Bot,
    Cpu,
    Video,
    Plane,
    Sparkles,
    Atom,
    Glasses
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import apiClient from '../api/apiClient'; // Assuming this exists or use standard fetch if needed

const courses = [
    {
        title: "Agentic AI",
        description: "Learning to build AI models using advanced algorithms.",
        icon: <Bot className="w-10 h-10 text-blue-500" />,
        color: "bg-blue-50"
    },
    {
        title: "AR/VR",
        description: "Exploring Augmented and Virtual Reality for gaming and entertainment.",
        icon: <Glasses className="w-10 h-10 text-purple-500" />,
        color: "bg-purple-50"
    },
    {
        title: "Neuroscience",
        description: "Study of the brain, neural networks, and cognition.",
        icon: <Brain className="w-10 h-10 text-pink-500" />,
        color: "bg-pink-50"
    },
    {
        title: "Game Development",
        description: "Basics of game mechanics, design, and programming.",
        icon: <Gamepad className="w-10 h-10 text-green-500" />,
        color: "bg-green-50"
    },
    {
        title: "Web Development",
        description: "Fundamentals of front-end and back-end technologies.",
        icon: <Globe className="w-10 h-10 text-cyan-500" />,
        color: "bg-cyan-50"
    },
    {
        title: "Machine Learning",
        description: "Supervised/unsupervised learning and data analysis.",
        icon: <Cpu className="w-10 h-10 text-indigo-500" />,
        color: "bg-indigo-50"
    },
    {
        title: "Artificial Intelligence",
        description: "NLP and building systems that mimic human behavior.",
        icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
        color: "bg-yellow-50"
    },
    {
        title: "Robotics",
        description: "Fundamentals of robotic systems, automation, and industry usage.",
        icon: <Atom className="w-10 h-10 text-red-500" />,
        color: "bg-red-50"
    },
    {
        title: "Animation",
        description: "Traditional and CGI animation techniques.",
        icon: <Video className="w-10 h-10 text-orange-500" />,
        color: "bg-orange-50"
    },
    {
        title: "Drone Workshop",
        description: "Hands-on experience with drone technology and flight.",
        icon: <Plane className="w-10 h-10 text-teal-500" />,
        color: "bg-teal-50"
    }
];

const YoungInnovator = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        occupation: '',
        message: '',
        terms: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.terms) {
            toast.error("Please accept the Terms & Conditions");
            return;
        }
        setLoading(true);
        // Simulate API call or replace with actual endpoint
        try {
            // await apiClient.post('/young-innovator/register', formData); 
            // For now just simulate success
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Registration Successful! We will contact you soon.");
            setFormData({
                name: '',
                email: '',
                phone: '',
                age: '',
                occupation: '',
                message: '',
                terms: false
            });
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <div className="inline-block px-4 py-1 mb-4 border border-purple-400 rounded-full bg-purple-900/50 text-purple-300 text-sm font-semibold tracking-wider">
                            FUTURE READY
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            TURN YOUR CHILD INTO A <span className="text-purple-400">YOUNG INNOVATOR!!!</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                            Inspire your child to think creatively, solve problems, and become a confident innovator ready to shine in the world.
                        </p>
                        <button onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                            Join Us Now
                        </button>

                        <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                <span className="block text-xs text-gray-400">Special Offer</span>
                                <span className="font-bold text-green-400 text-xl">₹1999</span>
                                <span className="text-sm text-gray-500 line-through ml-2">₹3500</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
                            {/* Abstract shape or placeholder for a hero image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full opacity-30 animate-pulse"></div>
                            <div className="absolute inset-4 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-700 shadow-2xl overflow-hidden">
                                <div className="text-center p-8">
                                    <Sparkles className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Unlock Potential</h3>
                                    <p className="text-gray-400">Give your child the tools to build the future.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-20 px-4 bg-gray-50" id="courses">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Tracks & Courses</h2>
                        <p className="text-xl text-gray-600">Comprehensive curriculum designed for future leaders</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course, index) => (
                            <div key={index} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                <div className={`w-16 h-16 ${course.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {course.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{course.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 bg-white relative overflow-hidden" id="contact-form">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="md:w-5/12 bg-gradient-to-br from-indigo-900 to-purple-900 p-10 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                            <p className="text-indigo-200 mb-8">Ready to start the journey? Fill out the form and we'll guide you through the next steps.</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <span>www.technovahub.in</span>
                                </div>
                                {/* Add more contact info if needed */}
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="w-20 h-20 rounded-full bg-purple-500/20 blur-xl absolute bottom-10 left-10"></div>
                        </div>
                    </div>

                    <div className="md:w-7/12 p-10">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Student / Parent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age of Child</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. 10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Any specific interests?"
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    id="terms"
                                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the <span className="text-purple-600 underline cursor-pointer">Terms & Conditions</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default YoungInnovator;

