import { Button, Card, Col, Row, Form, Input } from "antd";
import DynamicFieldSet from "../../components/multiple-inputs";
import React from "react";
import axios from "axios";
import URL from "../../config/urls";
import { useHistory } from "react-router";

function AddOrder() {
    const [form] = Form.useForm();
    const history = useHistory();
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    const onFinish = values => {
        console.log('Received values of form:', values);
        setIsButtonLoading(true);
        axios.post(URL.addOrder, values).then((response) => {
            console.log(response);
            setIsButtonLoading(false);
            history.push('/');
        }).catch(error => {
            setIsButtonLoading(false);
        });

    };
    return (
        <div className="form-laoyout">
            {/* <h2>Add Order</h2> */}

            <Card title={'Add Order'}>

                <Form
                    form={form}
                    layout="vertical"
                    // {...formItemLayoutWithOutLabel}
                    initialValues={{

                    }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Username" name="user" tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input username!' }]}
                    >
                        <Input placeholder="e.g Devid Clerk" />
                    </Form.Item>
                    {/* <br /> */}
                    <DynamicFieldSet />
                    <Form.Item
                        label="Price"
                        name="price"
                        tooltip="This is a required field"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input placeholder="e.g 22500" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isButtonLoading}>Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default AddOrder;