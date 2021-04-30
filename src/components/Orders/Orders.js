import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import OrderDetailsTable from '../OrderDetailsTable/OrderDetailsTable';

const Orders = () => {
    const [user] = useContext(UserContext);
    const { name, email } = user;
    const [allOrders, setAllOrders] = useState([]);
    const [isFetchData, setIsFetchData] = useState(false);
    document.title = 'Orders - Knowledge Haven';

    useEffect(() => {
        setIsFetchData(true);
        fetch(`https://rhubarb-cobbler-88648.herokuapp.com/submitedOrders/${email}`)
        .then(res => res.json())
        .then(data => {
            setAllOrders(data);
            setIsFetchData(false);
        });
    }, [email])

    return (
        <div>
            <h3>{name}</h3>
            {
                isFetchData
                    ? <div style={{ width: "80vw", height: "80vh" }} className="d-flex justify-content-center align-items-center">
                        <CircularProgress
                            size={100}
                            thickness={4}
                        />
                    </div>
                    : <>
                        {
                            !allOrders[0]
                                ? <h5>Nothing Ordered Yet</h5>
                                : allOrders.map(order => <OrderDetailsTable order={order} key={order._id} />)
                        }
                    </>

            }
        </div>
    );
};

export default Orders;