import { Button, Card, Col, Row, Skeleton, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import URL from "../../config/urls";

function OrderDetail() {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${URL.orderDetail}${id}`).then(response => {
            setOrder(response.data);
            setIsLoading(false);
            console.log(response.data);
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        });
    }, []);

    const handleCancelOrder = () => {
        setIsLoading(true);
        axios.put(`${URL.orderUpdate}${id}`, { state: 'Cancelled' }).then(response => {
            setOrder(response.data);
            setIsLoading(false);
            console.log(response.data);
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        });
    }

    return (
        <Card className="order-detail">
            {
                (!order || isLoading) ? (
                    <Skeleton />
                ) : (
                    <div>
                        <div className="order-detail-header">
                            <h3>Order Id: {order._id}</h3>
                            {!(order.state === 'Cancelled' || order.state === 'Delivered') && <Button onClick={handleCancelOrder}>Cancel Order</Button>}
                        </div>
                        <h2>{order.user}</h2>
                        <Row>
                            <Col span={8}>
                                State
                            </Col>
                            <Col span={16}>
                                <b>{order.state}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                Price
                            </Col>
                            <Col span={16}>
                                <b>{order.price}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                Created on
                            </Col>
                            <Col span={16}>
                                <b>{new Date(order.createdAt).toLocaleString()}</b>
                            </Col>
                        </Row>
                        <div>
                            <p>Products</p>
                            <List
                                size="large"
                                bordered
                                dataSource={order.products}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </div>
                    </div>
                )
            }
        </Card>
    )
}

export default OrderDetail;