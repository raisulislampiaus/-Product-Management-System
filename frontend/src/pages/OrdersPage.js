import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import api from '../utils/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        console.log('Fetched orders:', response.data); // Debugging line
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (orderId) => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setSelectedOrder(response.data);
        setOpen(true);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details.');
      }
    };

    fetchOrderDetails();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(order.id)} color="primary">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No orders found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedOrder && (
        <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            Order Details
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close" style={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">Order ID: {selectedOrder.id}</Typography>
            <Typography variant="body1">Total Amount: {selectedOrder.totalAmount}</Typography>
            <Typography variant="body1">Status: {selectedOrder.status}</Typography>
            {/* Add more details here as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;
