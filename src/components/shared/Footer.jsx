import {
  BsFacebook,
  BsFillTelephoneFill,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import Container from "./Container";

const Footer = () => {
  const handleMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    form.reset();
    toast.info(`Got Your Message Mr. ${name}. We Will Contact You Soon!`, {
      theme: "colored",
    });
  };
  return (
    <div className="bg-emerald-200 bg-opacity-20">
      <Container>
        <div className="py-10 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-40" />
            </div>
            <p className="mt-1 text-justify">
              Unleash the tech enthusiast in you at Nexify—where innovation
              meets discovery. Dive into the latest gadgets, share your finds,
              and be part of the future of technology!
            </p>
            <div className="flex items-center gap-2 text-2xl mt-3">
              <Link
                to="#"
                className="text-yellow-500 hover:text-emerald-500 transition-all duration-1000"
              >
                <BsFacebook />
              </Link>
              <Link
                to="#"
                className="text-yellow-500 hover:text-emerald-500 transition-all duration-1000"
              >
                <BsTwitter />
              </Link>
              <Link
                to="#"
                className="text-yellow-500 hover:text-emerald-500 transition-all duration-1000"
              >
                <BsInstagram />
              </Link>
              <Link
                to="#"
                className="text-yellow-500 hover:text-emerald-500 transition-all duration-1000"
              >
                <BsLinkedin />
              </Link>
            </div>
            <h2 className="text-3xl   mt-5">Get in Touch</h2>
            <div className="mt-2 space-y-1 ">
              <p className="flex items-center gap-2 ">
                <BsFillTelephoneFill />
                <span>+880 1406680846</span>
              </p>
              <p className="flex items-center gap-2 ">
                <GrMail />
                <span>shamshul.haque.dev@gmail.com</span>
              </p>
              <p className="flex items-center gap-2 ">
                <MdLocationOn />
                <span>71/A, Uttar Jatrabari, Dhaka</span>
              </p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl  ">Connect with Us</h2>
            <form onSubmit={handleMessage} className="space-y-4 mt-5 ">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full p-2 rounded outline-0 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full p-2 rounded outline-0 text-sm"
              />
              <textarea
                name="message"
                cols="10"
                rows="2"
                placeholder="Message"
                required
                className="w-full p-2 rounded outline-0 text-sm"
              />
              <input
                type="submit"
                value="Send Message"
                className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer"
              />
            </form>
          </div>
        </div>
      </Container>
      <p className="text-sm text-center py-5 bg-yellow-200 bg-opacity-20">
        Copyright Nexify! All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
