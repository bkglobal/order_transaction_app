import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header';
import { Layout } from 'antd';
import OrderList from './pages/order-list';
import AddOrder from './pages/add-order';
import OrderDetail from './pages/order-detail';
const { Header, Content } = Layout;


function App() {
  return (
    <Layout>
      <Router>
        <Header><HeaderComponent /></Header>
        <Content>
          <Switch>
            <Route path="/" exact component={OrderList} />
            <Route path="/add-order" exact component={AddOrder} />
            <Route path="/detail/:id" exact component={OrderDetail} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
