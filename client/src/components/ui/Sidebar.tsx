import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Sidebar() {
  return (
    <nav className="menu-lateral">
      <ul>
        <li className="item-menu">
          <a href="#"><i className="bi bi-house"></i></a>
        </li>
        <li className="item-menu">
          <a href="#"><i className="bi bi-person-circle"></i></a>
        </li>
        <li className="item-menu">
          <a href="#"><i className="bi bi-currency-dollar"></i></a>
        </li>
        <li className="item-menu">
          <a href="#"><i className="bi bi-chat-dots"></i></a>
        </li>
      </ul>
    </nav>
  );
}
