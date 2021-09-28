import { useHistory } from "react-router";

function Header() {
    const history = useHistory();
    return (
        <div className="order-app-header">
            <h2 onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>Order Mangement App</h2>
        </div>
    )
}

export default Header;