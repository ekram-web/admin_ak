import React from "react";
import InboxLayout from "./components/InboxLayout";
import { Box, Typography, Divider, Chip, Stack } from "@mui/material";
// Detail component for Subscriptions
const SubscriptionDetail = ({ data, createdAt }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      New Newsletter Subscription
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      Email: {data.email}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Subscribed On: {new Date(createdAt).toLocaleString()}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6">Subscriber Details:</Typography>
    <Typography>
      <strong>First Name:</strong> {data.firstName || "N/A"}
    </Typography>
    <Typography>
      <strong>Last Name:</strong> {data.lastName || "N/A"}
    </Typography>
    <Typography>
      <strong>Email Frequency:</strong> {data.frequency || "N/A"}
    </Typography>
    <Typography sx={{ mt: 2 }}>
      <strong>Interests:</strong>
    </Typography>
    <Stack direction="row" spacing={1}>
      {Array.isArray(data.interests) ? (
        data.interests.map((interest) => (
          <Chip key={interest} label={interest} />
        ))
      ) : (
        <Chip label={data.interests} />
      )}
    </Stack>
  </Box>
);
const ContentSubscriptionsAdmin = () => {
  return (
    <InboxLayout
      pageTitle="Subscriptions"
      itemType="Subscription"
      dataKey="Subscription" // MUST match the 'type' string
      DetailComponent={SubscriptionDetail}
    />
  );
};
export default ContentSubscriptionsAdmin;
