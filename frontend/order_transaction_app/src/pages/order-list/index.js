import { Button, Card, Col, Row, Skeleton, Table, } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import URL from "../../config/urls";

function OrderList() {
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState(null);
    const history = useHistory();
    useEffect(() => {
        setIsLoading(true);
        axios.get(URL.orderList).then(response => {
            setOrderList(response.data);

            setColumns([
                {
                    title: 'Order Id',
                    dataIndex: '_id',
                }, {
                    title: 'Name',
                    dataIndex: 'user',
                   
                }
                , {
                    title: 'Price',
                    dataIndex: 'price',
                    sorter: (a, b) => a.price - b.price,
                }
            ])

            setIsLoading(false);
            console.log(response.data);
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        });
    }, []);
    return (
        <div className="order-list-main">
            <div className="order-list-head">
                <Button onClick={() => history.push('/add-order')}>Add Order</Button>
            </div>

            <div className="order-list-table">
                {(isLoading || !columns) ? (
                    <Skeleton />
                ) : (
                    <>
                        <Table columns={columns} dataSource={orderList} pagination={false} rowClassName={'table-row-customized'} onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    history.push(`/detail/${record._id}`);
                                }
                            }
                        }} />

                        {/* <Row gutter={[16, 16]}>
                            {orderList.map(order => (
                                <Col lg={8} md={12} xs={24}>
                                    <Card title={`${order.user} (${order.state})`} bordered={false} className="order-card" onClick={() => history.push(`/detail/${order._id}`)}>
                                        <Row>
                                            <Col span={8}>Order Id</Col>
                                            <Col span={8}>{order._id}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>Price</Col>
                                            <Col span={8}>{order.price}</Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row> */}
                    </>
                )}

            </div>
        </div>
    )
}

export default OrderList;