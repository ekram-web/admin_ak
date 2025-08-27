import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, TextField, Button, Modal, IconButton, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { useSnackbar } from 'notistack';
import { mockApi } from '../../../api/mockApi'; // <-- CORRECTED PATH

// --- MODAL STYLE ---
const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 'clamp(400px, 70vw, 800px)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
};

// --- REUSABLE PRODUCT FORM MODAL ---
const ProductFormModal = ({ open, handleClose, fields, initialData, onSave, mainCategory }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = { id: initialData?.id, mainCategory };
        fields.forEach(field => {
            if (field.type !== 'file') { data[field.name] = formData.get(field.name); }
        });
        onSave(data);
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>{initialData?.id ? 'Edit' : 'Add'} Product</Typography>
                {fields.map(field => field.type === 'file' ? (
                    <Button key={field.name} component="label" variant="outlined" startIcon={<ImageIcon />} sx={{ mb: 2, width: '100%' }}>
                        {field.label}<input type="file" accept={field.accept} hidden />
                    </Button>
                ) : (
                    <TextField key={field.name} name={field.name} label={field.label} defaultValue={initialData?.[field.name] ?? ''} fullWidth required={field.required} type={field.type || 'text'} multiline={field.multiline} rows={field.rows} sx={{ mb: 2 }} />
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Save Product</Button>
                </Box>
            </Box>
        </Modal>
    );
};

// --- REUSABLE PAGE CONTENT MODAL ---
const PageContentModal = ({ open, handleClose, data, onSave }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={(e) => { e.preventDefault(); onSave({ title: e.target.title.value, intro: e.target.intro.value }); handleClose(); }}>
            <Typography variant="h5" gutterBottom>Edit Page Content</Typography>
            <TextField name="title" label="Page Title" defaultValue={data?.title} fullWidth required sx={{ mb: 2 }} />
            <TextField name="intro" label="Introductory Text" defaultValue={data?.intro} fullWidth required multiline rows={4} sx={{ mb: 2 }} />
            <Button component="label" variant="outlined" startIcon={<ImageIcon />} sx={{mb: 2}}>Upload Hero Image<input type="file" accept="image/*" hidden /></Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}><Button onClick={handleClose}>Cancel</Button><Button type="submit" variant="contained">Save Content</Button></Box>
        </Box>
    </Modal>
);

// --- THE MAIN REUSABLE COMPONENT ---
const ProductManagementPage = ({ mainCategory, productFields, columns }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [pageContent, setPageContent] = useState({});
    const [products, setProducts] = useState([]);
    
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [contentModalOpen, setContentModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            mockApi.getProductPageData(mainCategory),
            mockApi.getProductsByCategory(mainCategory)
        ]).then(([contentRes, productsRes]) => {
            setPageContent(contentRes.data);
            setProducts(productsRes.data);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch product data:", error);
            enqueueSnackbar("Failed to load data. Please try again.", { variant: 'error' });
            setLoading(false);
        });
    };

    useEffect(() => { fetchData(); }, [mainCategory]);

    const handleSaveProduct = (productData) => {
        mockApi.saveProduct(productData).then(() => {
            enqueueSnackbar(`Product ${productData.id ? 'updated' : 'added'} successfully!`, { variant: 'success' });
            fetchData();
        });
    };
    
    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            mockApi.deleteProduct(productId).then(() => {
                enqueueSnackbar('Product deleted!', { variant: 'warning' });
                fetchData();
            });
        }
    };
    
    const handleSavePageContent = (contentData) => {
        mockApi.saveProductPageData(mainCategory, contentData).then(() => {
            enqueueSnackbar('Page content updated successfully!', { variant: 'success' });
            fetchData();
        });
    };
    
    const finalColumns = [
        ...columns,
        { field: 'actions', headerName: 'Actions', sortable: false, width: 180, renderCell: (params) => (
            <>
                <IconButton onClick={() => { setEditingProduct(params.row); setProductModalOpen(true); }}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteProduct(params.row.id)}><DeleteIcon /></IconButton>
            </>
        )}
    ];

    if (loading && !products.length) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    return (
        <Paper elevation={3} sx={{p: 3}}>
            
            {productModalOpen && <ProductFormModal open={productModalOpen} handleClose={() => setProductModalOpen(false)} fields={productFields} initialData={editingProduct} onSave={handleSaveProduct} mainCategory={mainCategory} />}
            {contentModalOpen && <PageContentModal open={contentModalOpen} handleClose={() => setContentModalOpen(false)} data={pageContent} onSave={handleSavePageContent} />}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Manage {pageContent?.title || mainCategory}</Typography>
                <Box>
                    <Button variant="outlined" sx={{mr: 2}} onClick={() => setContentModalOpen(true)}>Edit Page Content</Button>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditingProduct(null); setProductModalOpen(true); }}>
                        Add Product
                    </Button>
                </Box>
            </Box>
            <Typography paragraph color="text.secondary">{pageContent?.intro}</Typography>
            <Box sx={{ height: '65vh', width: '100%' }}>
                <DataGrid
                    rows={products}
                    columns={finalColumns}
                    loading={loading}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    pageSizeOptions={[10, 25, 50]}
                />
            </Box>
        </Paper>
    );
};

export default ProductManagementPage;