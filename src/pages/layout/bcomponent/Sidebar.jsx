import { Nav } from "react-bootstrap";

function Sidebar() {
  const menu = {
    Dashboard: {
      link: "dashboard",
      icon: "bi-speedometer",
    },
    Profile: {
      link: "profile",
      icon: "bi-person-circle",
    },
    Media: {
      link: "media",
      icon: "bi-collection",
    },
    Post: {
      link: "posts",
      icon: "bi-pin-angle",
    },
    Pages: {
      link: "pages",
      icon: "bi-file-earmark-plus",
    },
    Settings: {
      link: "settings",
      icon: "bi-sliders",
    },
    Subscribers: {
      link: "subscribers",
      icon: "bi-people",
    },
  };
  return (
    <div>
      <Nav className='flex-column' variant='pill'>
        {Object.entries(menu).map(([menuItem, { link, icon }], index) => (
          <Nav.Link className='cms-nav' href={`${link}`} key={index}>
            <i className={`bi ${icon}`}></i>
            {"  "}
            {menuItem}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;
