import { Box, Container, Typography } from "@mui/material";

const ItemsSummary = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Offering the best technologies
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Be sure to use some of our promotions:
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Codes:
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          20%OFF - 20% off final cost cannot be used in conjunction with other
          codes
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          5%OFF - 5% off final cost can be used in conjunction with other codes
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          20€ OFF - 20 € off final cost can be used in conjunction with other
          codes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Quantity:
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          {" "}
          3 Motion sensors for 65.00 €{" "}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          2 Smoke Sensors for 35.00 €{" "}
        </Typography>
      </Container>
    </Box>
  );
};

export default ItemsSummary;
