import {
  Sidebar as Sd,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { IoMdMenu } from "react-icons/io";

import { Link, useLocation } from "react-router-dom";

function Sidebar({ menu }) {
  const { pathname } = useLocation();
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <Sd defaultCollapsed={true} className="min-h-[100vh]">
      <div className="flex space-x-4 justify-center items-center h-12">
        <div
          className="cursor-pointer hover:bg-gray-600/30 p-2 rounded-full"
          onClick={() => collapseSidebar()}
        >
          <IoMdMenu size={25} />
        </div>
      </div>
      <Menu className="transition ease-in-out">
        {menu.map(({ text, url, icon: Icon }, _) => {
          const class_ =
            pathname == url
              ? "bg-gray-300 text-slate-800  font-bold"
              : "text-slate-800";

          const size_ = pathname == url ? 32 : 25;
          return (
            <MenuItem
              key={_}
              icon={<Icon className="text-slate-800" size={size_} />}
              component={<Link to={url} />}
              className={class_}
            >
              {text}
            </MenuItem>
          );
        })}
      </Menu>
    </Sd>
  );
}
export default Sidebar;
