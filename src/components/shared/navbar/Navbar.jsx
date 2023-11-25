import logo from "../../../assets/logo.png";
import Container from "../Container";
import DropdownMenus from "./DropdownMenus";
import LgMenus from "./LgMenus";

const Navbar = () => {
  return (
    <div>
      <div className="w-full max-w-screen-xl z-50 bg-black bg-opacity-20 py-3">
        <Container>
          <div className="flex justify-between items-center">
            {/* logo */}
            <img src={logo} alt="logo" className="w-32" />

            <div>
              {/* manus of large devices */}
              <div className="hidden lg:block">
                <LgMenus />
              </div>

              {/* manus small and medium devices */}
              <div className="block lg:hidden">
                <DropdownMenus />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
