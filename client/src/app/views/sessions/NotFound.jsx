import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const H6 = styled(Box)(() => ({
  color: "#000",
  fontWeight: "bold",
  fontSize: "4rem",
  margin: "3rem",
}));

const NotFoundRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh !important',
}));

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundRoot>
      <div>
        <H6>404 Page not found.</H6>
        <div style={{ textAlign: "center" }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ textTransform: 'capitalize', textAlign: "center" }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </NotFoundRoot>
  );
};

export default NotFound;
