// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Modal,
//   IconButton,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Card,
//   CardContent,
//   Avatar,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import ImageIcon from "@mui/icons-material/Image";
// import VideoFileIcon from "@mui/icons-material/VideoFile";
// import { useSnackbar } from "notistack";
// import apiClient from "../../api/apiClient";

// // --- STYLES FOR MODALS ---
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "clamp(400px, 70vw, 700px)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// // --- REUSABLE MODAL COMPONENTS ---
// const HeroFormModal = ({ open, handleClose, data, onSave }) => (
//   <Modal open={open} onClose={handleClose}>
//     <Box
//       sx={modalStyle}
//       component="form"
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSave(new FormData(e.currentTarget));
//         handleClose();
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Edit Hero Section
//       </Typography>
//       <TextField
//         name="title"
//         label="Main Title"
//         defaultValue={data?.title}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="subtitle"
//         label="Subtitle"
//         defaultValue={data?.subtitle}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <Button
//         component="label"
//         variant="outlined"
//         startIcon={<VideoFileIcon />}
//         sx={{ mb: 2, width: "100%" }}
//       >
//         Upload New Background Video (Current: {data?.videoUrl})
//         <input type="file" name="video" accept="video/*" hidden />
//       </Button>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button type="submit" variant="contained">
//           Save
//         </Button>
//       </Box>
//     </Box>
//   </Modal>
// );

// const FeaturedItemFormModal = ({ open, handleClose, data, onSave }) => (
//   <Modal open={open} onClose={handleClose}>
//     <Box
//       sx={modalStyle}
//       component="form"
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSave(new FormData(e.currentTarget));
//         handleClose();
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         {data?.id ? "Edit" : "Add"} Featured Item
//       </Typography>
//       <TextField
//         name="title"
//         label="Title"
//         defaultValue={data?.title}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="description"
//         label="Description"
//         defaultValue={data?.description}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <Button
//         component="label"
//         variant="outlined"
//         startIcon={<ImageIcon />}
//         sx={{ mb: 2, width: "100%" }}
//       >
//         Upload Image
//         <input type="file" name="image" accept="image/*" hidden />
//       </Button>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button type="submit" variant="contained">
//           Save
//         </Button>
//       </Box>
//     </Box>
//   </Modal>
// );

// const TechnologyFormModal = ({ open, handleClose, tech, onSave }) => (
//   <Modal open={open} onClose={handleClose}>
//     <Box
//       sx={modalStyle}
//       component="form"
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSave(new FormData(e.currentTarget));
//         handleClose();
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         {tech?.id ? `Edit: ${tech.name}` : "Add New Technology"}
//       </Typography>
//       <TextField
//         name="name"
//         label="Technology Name"
//         defaultValue={tech?.name}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="shortDesc"
//         label="Short Description"
//         defaultValue={tech?.shortDesc}
//         fullWidth
//         required
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="longDesc"
//         label="Long Description"
//         defaultValue={tech?.longDesc}
//         fullWidth
//         multiline
//         rows={4}
//         required
//         sx={{ mb: 2 }}
//       />
//       <Button
//         component="label"
//         variant="outlined"
//         startIcon={<ImageIcon />}
//         sx={{ mb: 2, width: "100%" }}
//       >
//         Upload Image
//         <input type="file" name="image" accept="image/*" hidden />
//       </Button>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button type="submit" variant="contained">
//           Save Technology
//         </Button>
//       </Box>
//     </Box>
//   </Modal>
// );

// // --- MAIN ADMIN PAGE COMPONENT ---
// const HomePageAdmin = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [loading, setLoading] = useState(true);
//   const [pageData, setPageData] = useState(null);
//   const [technologies, setTechnologies] = useState([]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);

//   const fetchData = () => {
//     if (!loading) setLoading(true);
//     Promise.all([
//       apiClient.get("/admin/pages/homepage"),
//       apiClient.get("/admin/technologies"),
//     ])
//       .then(([pageRes, techRes]) => {
//         setPageData(pageRes.data);
//         setTechnologies(techRes.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         enqueueSnackbar("Failed to load homepage data!", { variant: "error" });
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const openModal = (type, data) => {
//     setEditingItem(data);
//     setModalContent(type);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setEditingItem(null);
//   };

//   const handleContentSave = async (section, data) => {
//     try {
//       await apiClient.post("/admin/pages/homepage", { [section]: data });
//       enqueueSnackbar(
//         `${
//           section.charAt(0).toUpperCase() + section.slice(1)
//         } section updated!`,
//         { variant: "success" }
//       );
//       fetchData();
//     } catch (error) {
//       enqueueSnackbar("Failed to save content.", { variant: "error" });
//     }
//   };

//   const handleCrudSave = async (endpoint, formData, itemType, itemId) => {
//     try {
//       if (itemId) {
//         formData.append("_method", "PUT");
//         await apiClient.post(`${endpoint}/${itemId}`, formData);
//       } else {
//         await apiClient.post(endpoint, formData);
//       }
//       enqueueSnackbar(
//         `${itemType} ${itemId ? "updated" : "added"} successfully!`,
//         { variant: "success" }
//       );
//       fetchData();
//     } catch (error) {
//       enqueueSnackbar(`Failed to save ${itemType.toLowerCase()}.`, {
//         variant: "error",
//       });
//     }
//   };

//   const handleCrudDelete = async (endpoint, itemId, itemType) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete this ${itemType.toLowerCase()}?`
//       )
//     ) {
//       try {
//         await apiClient.delete(`${endpoint}/${itemId}`);
//         enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
//         fetchData();
//       } catch (error) {
//         enqueueSnackbar(`Failed to delete ${itemType.toLowerCase()}.`, {
//           variant: "error",
//         });
//       }
//     }
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   if (!pageData)
//     return <Typography color="error">Could not load page data.</Typography>;

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Manage Homepage Content
//       </Typography>

//       {modalOpen && modalContent === "hero" && (
//         <HeroFormModal
//           open={modalOpen}
//           handleClose={handleCloseModal}
//           data={editingItem}
//           onSave={(formData) =>
//             handleContentSave("hero", Object.fromEntries(formData.entries()))
//           }
//         />
//       )}
//       {modalOpen && modalContent === "feature" && (
//         <FeaturedItemFormModal
//           open={modalOpen}
//           handleClose={handleCloseModal}
//           data={editingItem}
//           onSave={(formData) =>
//             handleCrudSave(
//               "/admin/featured-items",
//               formData,
//               "Featured Item",
//               editingItem?.id
//             )
//           }
//         />
//       )}
//       {modalOpen && modalContent === "tech" && (
//         <TechnologyFormModal
//           open={modalOpen}
//           handleClose={handleCloseModal}
//           tech={editingItem}
//           onSave={(formData) =>
//             handleCrudSave(
//               "/admin/technologies",
//               formData,
//               "Technology",
//               editingItem?.id
//             )
//           }
//         />
//       )}

//       <Accordion defaultExpanded>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">Hero Section</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Card variant="outlined">
//             <CardContent>
//               <Typography variant="h5">{pageData.hero?.title}</Typography>
//               <Typography color="text.secondary">
//                 {pageData.hero?.subtitle}
//               </Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<EditIcon />}
//                 sx={{ mt: 2 }}
//                 onClick={() => openModal("hero", pageData.hero)}
//               >
//                 Edit Hero
//               </Button>
//             </CardContent>
//           </Card>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">Product Showcase</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <List>
//             {pageData.featuredItems?.map((item) => (
//               <ListItem
//                 key={item.id}
//                 secondaryAction={
//                   <>
//                     <IconButton onClick={() => openModal("feature", item)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() =>
//                         handleCrudDelete(
//                           "/admin/featured-items",
//                           item.id,
//                           "Featured Item"
//                         )
//                       }
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </>
//                 }
//               >
//                 <Avatar
//                   variant="rounded"
//                   src={item.imageUrl}
//                   sx={{ mr: 2, width: 56, height: 56 }}
//                 >
//                   <ImageIcon />
//                 </Avatar>
//                 <ListItemText
//                   primary={item.title}
//                   secondary={item.description}
//                 />
//               </ListItem>
//             ))}
//           </List>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => openModal("feature", null)}
//           >
//             Add Featured Item
//           </Button>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">Core Technologies</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <List>
//             {technologies.map((tech) => (
//               <ListItem
//                 key={tech.id}
//                 secondaryAction={
//                   <>
//                     <IconButton onClick={() => openModal("tech", tech)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() =>
//                         handleCrudDelete(
//                           "/admin/technologies",
//                           tech.id,
//                           "Technology"
//                         )
//                       }
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </>
//                 }
//               >
//                 <ListItemText primary={tech.name} secondary={tech.shortDesc} />
//               </ListItem>
//             ))}
//           </List>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => openModal("tech", null)}
//           >
//             Add Technology
//           </Button>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">Newsroom</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <List>
//             {pageData.newsroomVideos?.map((item) => (
//               <ListItem
//                 key={item.id}
//                 secondaryAction={
//                   <>
//                     <IconButton
//                       onClick={() =>
//                         enqueueSnackbar("Edit not implemented yet.")
//                       }
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       onClick={() =>
//                         enqueueSnackbar("Delete not implemented yet.")
//                       }
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </>
//                 }
//               >
//                 <ListItemIcon>
//                   <VideoFileIcon />
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={`Video Slot ${item.id}`}
//                   secondary={item.videoUrl}
//                 />
//               </ListItem>
//             ))}
//           </List>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => enqueueSnackbar("Add not implemented yet.")}
//           >
//             Add Newsroom Video
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );
// };

// export default HomePageAdmin;

// ??

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { useSnackbar } from "notistack";
import apiClient from "../../api/apiClient";

// --- STYLES FOR MODALS ---
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(400px, 70vw, 700px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// --- REUSABLE MODAL COMPONENTS ---
const HeroFormModal = ({ open, handleClose, data, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Hero Section
      </Typography>
      <TextField
        name="title"
        label="Main Title"
        defaultValue={data?.title}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="subtitle"
        label="Subtitle"
        defaultValue={data?.subtitle}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        component="label"
        variant="outlined"
        startIcon={<VideoFileIcon />}
        sx={{ mb: 2, width: "100%" }}
      >
        Upload New Background Video
        <input type="file" name="video" accept="video/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

const FeaturedItemFormModal = ({ open, handleClose, data, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <Typography variant="h5" gutterBottom>
        {data?.id ? "Edit" : "Add"} Featured Item
      </Typography>
      <TextField
        name="title"
        label="Title"
        defaultValue={data?.title}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="description"
        label="Description"
        defaultValue={data?.description}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        component="label"
        variant="outlined"
        startIcon={<ImageIcon />}
        sx={{ mb: 2, width: "100%" }}
      >
        Upload Image
        <input type="file" name="image" accept="image/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

const TechnologyFormModal = ({ open, handleClose, tech, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <Typography variant="h5" gutterBottom>
        {tech?.id ? `Edit: ${tech.name}` : "Add New Technology"}
      </Typography>
      <TextField
        name="name"
        label="Technology Name"
        defaultValue={tech?.name}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="shortDesc"
        label="Short Description"
        defaultValue={tech?.shortDesc}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="longDesc"
        label="Long Description"
        defaultValue={tech?.longDesc}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <Button
        component="label"
        variant="outlined"
        startIcon={<ImageIcon />}
        sx={{ mb: 2, width: "100%" }}
      >
        Upload Image
        <input type="file" name="image" accept="image/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save Technology
        </Button>
      </Box>
    </Box>
  </Modal>
);

const NewsroomVideoFormModal = ({ open, handleClose, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(new FormData(e.currentTarget));
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Newsroom Video
      </Typography>
      <Button
        component="label"
        variant="outlined"
        startIcon={<VideoFileIcon />}
        sx={{ mb: 2, width: "100%" }}
      >
        Upload Video
        <input type="file" name="video" accept="video/*" required hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

// --- MAIN ADMIN PAGE COMPONENT (FINAL VERSION) ---
const HomePageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [newsroomVideos, setNewsroomVideos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = async () => {
    try {
      const [pageRes, techRes, featuredRes, newsRes] = await Promise.all([
        apiClient.get("/admin/pages/homepage"),
        apiClient.get("/admin/technologies"),
        apiClient.get("/admin/featured-items"),
        apiClient.get("/admin/newsroom-videos"),
      ]);
      setPageData(pageRes.data);
      setTechnologies(techRes.data);
      setFeaturedItems(featuredRes.data);
      setNewsroomVideos(newsRes.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load homepage data!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, data = null) => {
    setEditingItem(data);
    setModalContent(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleContentSave = async (sectionKey, formData) => {
    try {
      await apiClient.post("/admin/pages/homepage", {
        [sectionKey]: Object.fromEntries(formData.entries()),
      });
      enqueueSnackbar("Hero Section updated!", { variant: "success" });
      fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save Hero section.", { variant: "error" });
    }
  };

  const handleCrudSave = async (endpoint, formData, itemType, itemId) => {
    try {
      const isUpdate = !!itemId;
      const url = isUpdate ? `${endpoint}/${itemId}` : endpoint;

      if (isUpdate) {
        formData.append("_method", "PUT");
      }

      await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      enqueueSnackbar(`${itemType} ${isUpdate ? "updated" : "added"}!`, {
        variant: "success",
      });
      fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar(`Failed to save ${itemType.toLowerCase()}.`, {
        variant: "error",
      });
    }
  };

  const handleDelete = async (endpoint, itemId, itemType) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${itemType.toLowerCase()}?`
      )
    ) {
      try {
        await apiClient.delete(`${endpoint}/${itemId}`);
        enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
        fetchData();
      } catch (error) {
        enqueueSnackbar(`Failed to delete ${itemType.toLowerCase()}.`, {
          variant: "error",
        });
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!pageData)
    return (
      <Typography color="error">Could not load initial page data.</Typography>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Homepage Content
      </Typography>

      {modalOpen && modalContent === "hero" && (
        <HeroFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingItem}
          onSave={(formData) => {
            handleContentSave("hero", formData);
            handleCloseModal();
          }}
        />
      )}
      {modalOpen && modalContent === "feature" && (
        <FeaturedItemFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingItem}
          onSave={(formData) => {
            handleCrudSave(
              "/admin/featured-items",
              formData,
              "Featured Item",
              editingItem?.id
            );
            handleCloseModal();
          }}
        />
      )}
      {modalOpen && modalContent === "tech" && (
        <TechnologyFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          tech={editingItem}
          onSave={(formData) => {
            handleCrudSave(
              "/admin/technologies",
              formData,
              "Technology",
              editingItem?.id
            );
            handleCloseModal();
          }}
        />
      )}
      {modalOpen && modalContent === "news" && (
        <NewsroomVideoFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          onSave={(formData) => {
            handleCrudSave(
              "/admin/newsroom-videos",
              formData,
              "Newsroom Video"
            );
            handleCloseModal();
          }}
        />
      )}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Hero Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">{pageData.hero?.title}</Typography>
              <Typography color="text.secondary">
                {pageData.hero?.subtitle}
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
                onClick={() => openModal("hero", pageData.hero)}
              >
                Edit Hero
              </Button>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Product Showcase</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {featuredItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openModal("feature", item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDelete(
                          "/admin/featured-items",
                          item.id,
                          "Featured Item"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  variant="rounded"
                  src={
                    item.image_url
                      ? `http://127.0.0.1:8000/storage/${item.image_url}`
                      : ""
                  }
                  sx={{ mr: 2, width: 56, height: 56 }}
                >
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("feature")}
          >
            Add Featured Item
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Core Technologies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {technologies.map((tech) => (
              <ListItem
                key={tech.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openModal("tech", tech)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDelete(
                          "/admin/technologies",
                          tech.id,
                          "Technology"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={tech.name} secondary={tech.shortDesc} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("tech")}
          >
            Add Technology
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Newsroom Videos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {newsroomVideos.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    onClick={() =>
                      handleDelete(
                        "/admin/newsroom-videos",
                        item.id,
                        "Newsroom Video"
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <VideoFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Video ${item.id}`}
                  secondary={item.video_url}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("news")}
          >
            Add Newsroom Video
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HomePageAdmin;
