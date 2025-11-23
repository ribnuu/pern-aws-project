import React from "react";

const ContactUsPage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Contact Us
        </h2>

        {/* Contact Information Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">
              Contact Details
            </h3>
            <ul className="text-gray-400 space-y-4">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:ceo@eforce.lk"
                  className="text-blue-400 hover:underline"
                >
                  ceo@eforce.lk
                </a>
              </li>
              <li>
                <span className="font-medium">Phone:</span> +94 777744006
              </li>
              <li>
                <span className="font-medium">Address:</span> 43B Sirimal Mw,
                Dehiwela, Sri Lanka
              </li>
            </ul>
          </div>

          {/* Contact Form Card */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 px-3 py-2 block w-full bg-gray-700 border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-300 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 px-3 py-2 block w-full bg-gray-700 border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-300 sm:text-sm"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 px-3 py-2 block w-full bg-gray-700 border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-300 sm:text-sm"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-block bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-12">
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-200 mb-4">
              Visit Us
            </h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.352348924947!2d79.8674395!3d6.8619739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b2a8af134d7%3A0xf1ecb3f68c7b2cf9!2s43B%20Sirimal%20Mw%2C%20Dehiwela%2C%20Sri%20Lanka!5e0!3m2!1sen!2suk!4v1623923131235!5m2!1sen!2suk"
                className="w-full h-full"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;
