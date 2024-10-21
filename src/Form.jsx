import './index.css';


const form = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto my-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">Name</label>
                    <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" id="name" placeholder="Your name" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" placeholder="Your email" />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">Password</label>
                    <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" id="password" placeholder="Your password" />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Sign Up</button>
            </form>
        </>
    )
}

export default form