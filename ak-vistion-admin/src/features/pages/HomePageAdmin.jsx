import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Box, TextField, Button, Modal, IconButton, CircularProgress, List, ListItem, ListItemText,
  Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Avatar, ListItemIcon
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { useSnackbar } from 'notistack';
import apiClient from '../../api/apiClient';

// --- STYLES FOR MODALS (This is correct) ---
const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 'clamp(400px, 70vw, 700px)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
  maxHeight: '90vh', overflowY: 'auto'
};

// --- REUSABLE MODAL COMPONENTS (DEFINITIVE VERSIONS) ---

const HeroFormModal = ({ open, handleClose, data, onSave }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={onSave}>
            <Typography variant="h5" gutterBottom>Edit Hero Section</Typography>
            <TextField name="title" label="Main Title" defaultValue={data?.title} fullWidth required sx={{ mb: 2 }} />
            <TextField name="subtitle" label="Subtitle" defaultValue={data?.subtitle} fullWidth required sx={{ mb: 2 }} />
            <Button component="label" variant="outlined" startIcon={<VideoFileIcon />} sx={{mb: 2, width: '100%'}}>
                Upload New Background Video (Current: {data?.video_url})
                <input type="file" name="video" accept="video/*" hidden />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Box>
        </Box>
    </Modal>
);

const FeaturedItemFormModal = ({ open, handleClose, data, onSave }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={onSave}>
            <Typography variant="h5" gutterBottom>{data?.id ? 'Edit' : 'Add'} Featured Item</Typography>
            <TextField name="title" label="Title" defaultValue={data?.title} fullWidth required sx={{ mb: 2 }} />
            <TextField name="description" label="Description" defaultValue={data?.description} fullWidth required sx={{ mb: 2 }} />
            <Button component="label" variant="outlined" startIcon={<ImageIcon />} sx={{mb: 2, width: '100%'}}>
              Upload Image
              <input type="file" name="image" accept="image/*" hidden />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Box>
        </Box>
    </Modal>
);

const TechnologyFormModal = ({ open, handleClose, tech, onSave }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={onSave}>
            <Typography variant="h5" gutterBottom>{tech?.id ? `Edit: ${tech.name}` : 'Add New Technology'}</Typography>
            <TextField name="name" label="Technology Name" defaultValue={tech?.name} fullWidth required sx={{ mb: 2 }} />
            <TextField name="short_desc" label="Short Description" defaultValue={tech?.short_desc} fullWidth required sx={{ mb: 2 }} />
            <TextField name="long_desc" label="Long Description" defaultValue={tech?.long_desc} fullWidth multiline rows={4} required sx={{ mb: 2 }} />
            <Button component="label" variant="outlined" startIcon={<ImageIcon />} sx={{ mb: 2, width: '100%' }}>
                Upload Image
                <input type="file" name="image" accept="image/*" hidden />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save Technology</Button>
            </Box>
        </Box>
    </Modal>
);

const NewsroomVideoFormModal = ({ open, handleClose, onSave }) => (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={onSave}>
            <Typography variant="h5" gutterBottom>Add Newsroom Video</Typography>
            <Button component="label" variant="outlined" startIcon={<VideoFileIcon />} sx={{mb: 2, width: '100%'}}>
              Upload Video
              <input type="file" name="video" accept="video/*" required hidden />
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
            </Box>
        </Box>
    </Modal>
);


// --- MAIN ADMIN PAGE COMPONENT (FINAL VERSION) ---
const HomePageAdmin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState({ hero: {} });
    const [technologies, setTechnologies] = useState([]);
    const [featuredItems, setFeaturedItems] = useState([]);
    const [newsroomVideos, setNewsroomVideos] = useState([]);
    
    const [modalConfig, setModalConfig] = useState({ open: false, type: '', data: null });

    const fetchData = async () => {
        try {
            const [pageRes, techRes, featuredRes, newsRes] = await Promise.all([
                apiClient.get('/admin/pages/homepage'),
                apiClient.get('/admin/technologies'),
                apiClient.get('/admin/featured-items'),
                apiClient.get('/admin/newsroom-videos')
            ]);
            setPageData(pageRes.data);
            setTechnologies(techRes.data);
            setFeaturedItems(featuredRes.data);
            setNewsroomVideos(newsRes.data);
        } catch (err) {
            console.error(err.response || err);
            enqueueSnackbar('Failed to load homepage data!', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => { fetchData(); }, []);

    const openModal = (type, data = null) => setModalConfig({ open: true, type, data });
    const handleCloseModal = () => setModalConfig({ open: false, type: '', data: null });

    const handleSave = async (event, endpoint, itemType, itemId = null) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        handleCloseModal();
        try {
            const isUpdate = !!itemId;
            const url = isUpdate ? `${endpoint}/${itemId}` : endpoint;
            
            if (isUpdate) { formData.append('_method', 'POST'); }
            
            await apiClient.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            enqueueSnackbar(`${itemType} ${isUpdate ? 'updated' : 'added'}!`, { variant: 'success' });
            await fetchData();
        } catch (error) {
            console.error(error.response?.data);
            enqueueSnackbar(`Failed to save ${itemType.toLowerCase()}.`, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (endpoint, itemId, itemType) => {
        if (window.confirm(`Are you sure you want to delete this ${itemType.toLowerCase()}?`)) {
            setLoading(true);
            try {
                await apiClient.delete(`${endpoint}/${itemId}`);
                enqueueSnackbar(`${itemType} deleted!`, { variant: 'warning' });
                await fetchData();
            } catch (error) {
                enqueueSnackbar(`Failed to delete ${itemType.toLowerCase()}.`, { variant: 'error' });
            } finally { setLoading(false); }
        }
    };
    
    if (loading && !pageData) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    const renderModal = () => {
        if (!modalConfig.open) return null;
        
        switch (modalConfig.type) {
            case 'hero':
                return <HeroFormModal open={true} handleClose={handleCloseModal} data={modalConfig.data} onSave={(e) => handleSave(e, '/admin/pages/homepage', 'Hero Section')} />;
            case 'feature':
                return <FeaturedItemFormModal open={true} handleClose={handleCloseModal} data={modalConfig.data} onSave={(e) => handleSave(e, '/admin/featured-items', 'Featured Item', modalConfig.data?.id)} />;
            case 'tech':
                return <TechnologyFormModal open={true} handleClose={handleCloseModal} tech={modalConfig.data} onSave={(e) => handleSave(e, '/admin/technologies', 'Technology', modalConfig.data?.id)} />;
            case 'news':
                return <NewsroomVideoFormModal open={true} handleClose={handleCloseModal} onSave={(e) => handleSave(e, '/admin/newsroom-videos', 'Newsroom Video')} />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Manage Homepage Content</Typography>
            
            {renderModal()}

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">Hero Section</Typography></AccordionSummary>
                <AccordionDetails><Card variant="outlined"><CardContent>
                    <Typography variant="h5">{pageData.hero?.title || 'No Title Set'}</Typography>
                    <Typography color="text.secondary">{pageData.hero?.subtitle || 'No Subtitle Set'}</Typography>
                    <Button variant="contained" startIcon={<EditIcon />} sx={{ mt: 2 }} onClick={() => openModal("hero", pageData.hero)}>Edit Hero</Button>
                </CardContent></Card></AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">Product Showcase</Typography></AccordionSummary>
                <AccordionDetails>
                    <List>{featuredItems.map((item) => (<ListItem key={item.id} secondaryAction={ <><IconButton onClick={() => openModal("feature", item)}><EditIcon /></IconButton><IconButton onClick={() => handleDelete("/admin/featured-items", item.id, "Featured Item")}><DeleteIcon /></IconButton></> }><Avatar variant="rounded" src={item.image_url ? `http://127.0.0.1:8000/storage/${item.image_url}` : ""} sx={{ mr: 2, width: 56, height: 56 }}><ImageIcon /></Avatar><ListItemText primary={item.title} secondary={item.description} /></ListItem>))}</List>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal("feature")}>Add Featured Item</Button>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">Core Technologies</Typography></AccordionSummary>
                <AccordionDetails>
                     <List>{technologies.map((tech) => (<ListItem key={tech.id} secondaryAction={ <><IconButton onClick={() => openModal("tech", tech)}><EditIcon /></IconButton><IconButton onClick={() => handleDelete("/admin/technologies", tech.id, "Technology")}><DeleteIcon /></IconButton></> }><ListItemText primary={tech.name} secondary={tech.short_desc} /></ListItem>))}</List>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal("tech")}>Add Technology</Button>
                </AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">Newsroom Videos</Typography></AccordionSummary>
                <AccordionDetails>
                     <List>{newsroomVideos.map((item) => (<ListItem key={item.id} secondaryAction={<IconButton onClick={() => handleDelete("/admin/newsroom-videos", item.id, "Newsroom Video")}><DeleteIcon /></IconButton>}><ListItemIcon><VideoFileIcon /></ListItemIcon><ListItemText primary={`Video ${item.id}`} secondary={item.video_url} /></ListItem>))}</List>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal("news")}>Add Newsroom Video</Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default HomePageAdmin;