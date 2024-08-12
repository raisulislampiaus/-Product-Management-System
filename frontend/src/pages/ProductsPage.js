import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import api from "../utils/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
  });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          params: { page, limit, search },
        });
        setProducts(response.data);
        // You need to calculate totalPages based on your total products count or metadata from response
        // For now, let's assume the backend doesn't send total page info and you need to set it manually.
        setTotalPages(Math.ceil(100 / limit)); // Replace 100 with your total products count or fetch this info from your backend
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, limit, search]);

  const handleProductClick = (id) => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setSelectedProduct(response.data);
        setOpenDetails(true);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  const handleUpdateProductClick = (product) => {
    setNewProduct(product);
    setOpenUpdate(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleCreateProduct = async () => {
    try {
      await api.post("/products", newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
      });
      setOpenCreate(false);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await api.put(`/products/${newProduct.id}`, newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
      });
      setOpenUpdate(false);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCloseCreateModal = () => setOpenCreate(false);
  const handleCloseUpdateModal = () => setOpenUpdate(false);
  const handleCloseDetailsModal = () => setOpenDetails(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box marginBottom={2} display="flex" justifyContent="space-between">
        <TextField
          fullWidth
          margin="normal"
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreate(true)}
        >
          Create New Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleProductClick(product.id)}>
                    <RemoveRedEyeIcon  />
                  </IconButton>
                  <IconButton onClick={() => handleUpdateProductClick(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>

      <Dialog open={openDetails} onClose={handleCloseDetailsModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Product Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDetailsModal}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <div>
              <Typography variant="h6">{selectedProduct.name}</Typography>
              <p>Description: {selectedProduct.description}</p>
              <p>Price: {selectedProduct.price}</p>
              <p>Category: {selectedProduct.category}</p>
              <p>Stock Quantity: {selectedProduct.stockQuantity}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreate} onClose={handleCloseCreateModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create New Product
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseCreateModal}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            variant="outlined"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            variant="outlined"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            variant="outlined"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            variant="outlined"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            variant="outlined"
            value={newProduct.stockQuantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateProduct}
            color="primary"
            variant="contained"
          >
            Create Product
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleCloseUpdateModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Update Product
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseUpdateModal}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            variant="outlined"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            variant="outlined"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            variant="outlined"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            variant="outlined"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            variant="outlined"
            value={newProduct.stockQuantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProduct}
            color="primary"
            variant="contained"
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
