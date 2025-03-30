const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-10">
            <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-4xl font-bold text-center text-blue-400 mb-6">🛒 Welcome to Our E-commerce Store!</h2>
                <p className="text-gray-300 text-lg text-center">
                    Your one-stop shop for the latest and greatest products at unbeatable prices.
                    Experience seamless online shopping with secure payments and fast delivery.
                </p>

                {/* Company Aim Section */}
                <div className="mt-10 bg-gray-700 p-6 rounded-lg border border-gray-600">
                    <h3 className="text-2xl font-semibold text-yellow-400 text-center mb-4">🚀 Our Vision & Mission</h3>
                    <p className="text-gray-300 text-lg text-center">
                        Our mission is to revolutionize online shopping by offering a seamless, secure, and personalized experience.
                        We aim to provide high-quality products at affordable prices while ensuring excellent customer service.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mt-8 space-y-5">
                    <div className="flex items-center space-x-4">
                        <span className="text-blue-300 text-2xl">📦</span>
                        <p className="text-gray-300 text-lg">Wide range of high-quality products.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-yellow-300 text-2xl">🚚</span>
                        <p className="text-gray-300 text-lg">Fast & reliable shipping worldwide.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-purple-300 text-2xl">⭐</span>
                        <p className="text-gray-300 text-lg">Trusted by thousands of happy customers.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-red-300 text-2xl">🎯</span>
                        <p className="text-gray-300 text-lg">Personalized recommendations just for you.</p>
                    </div>
                </div>

               
            </div>
        </div>
    );
};

export default About;
