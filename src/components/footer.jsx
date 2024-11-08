import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#08294a] p-1 __className_8cc72f font-array">
      <div className="w-full max-w-screen-xl mx-auto p-0 md:py-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            className="flex items-center mb-4 sm:mb-0 space-x-1 rtl:space-x-reverse ml-5"
            href="/"
          >
            <span className="__className_37c115 text-[#e8f0e5] self-center text-4xl whitespace-nowrap ">
              Dialecto
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#e8f0e5] sm:mb-0">
            <li>
              <Link to="/aboutUs">
                <a href="" className="text-base hover:underline me-4 md:me-9">
                  About Us
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#e8f0e5] sm:mx-auto lg:my-8" />
        <span className="block text-sm text-[#e8f0e5] sm:text-center">
          © 2024{" "}
          <a className="hover:underline me-4 md:me-6" href="/">
            Dialecto™
          </a>
          All Rights Reserved
        </span>
      </div>
    </footer>
  );
}

export default Footer;
