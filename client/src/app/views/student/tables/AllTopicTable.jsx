import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    name: "john doe",
    major: "ABC Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "kessy bryan",
    major: "My Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "kessy bryan",
    major: "My Fintech LTD.",
    studentlist: ["1", "3"],
  },
  {
    name: "james cassegne",
    major: "Collboy Tech LTD.",
    studentlist: [1],
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    studentlist: [1],
  },
  {
    name: "lucy brown",
    major: "ABC Fintech LTD.",
    studentlist: [2, 3],
  },
];

const PaginationTable = () => {
  const [loading, setLoading] = useState(false);
  const [registeredTopic, setRegisteredTopic] = useState({});

  // Join modal
  const [openJoinTopicModal, setOpenJoinModal] = useState(false);
  const handleClickOpenJoinModal = () => setOpenJoinModal(true);
  const handleCloseJoinModal = () => setOpenJoinModal(false);

  // Noti success
  const [openSnackbar, setOpen] = React.useState(false);
  function handleClickSnackbar() {
    setOpen(true);
  }
  function handleCloseSnackbar(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    console.log(registeredTopic);
  }, [registeredTopic])


  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên đề tài</TableCell>
            <TableCell align="center">Chuyên ngành</TableCell>
            <TableCell align="center">Giáo viên hướng dẫn</TableCell>
            <TableCell align="center">Giáo viên phản biện</TableCell>
            <TableCell align="center">Số lượng thành viên (Tối đa: 3)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribarList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{subscriber.name}</TableCell>
                <TableCell align="center">{subscriber.major}</TableCell>
                <TableCell align="center">{subscriber.instructor}</TableCell>
                <TableCell align="center">{subscriber.reviewer}</TableCell>
                <TableCell align="center">{(subscriber.studentlist)?.length}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => { handleClickOpenJoinModal(); setRegisteredTopic(subscriber) }}>
                    <Icon color="primary">addcircleoutline</Icon>
                  </IconButton>
                  <IconButton onClick={handleClickSnackbar}>
                    <Icon color="success">done</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={subscribarList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
        labelRowsPerPage="Số dòng mỗi trang"
      />

      {/* Join modal */}
      <Dialog
        open={openJoinTopicModal}
        onClose={handleCloseJoinModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Thông tin đăng ký đề tài</DialogTitle>
        <DialogContent id="alert-dialog-description"
          style={{ width: "600px" }}>
          {/* Topic name */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Tên đề tài
            </Grid>
            <Grid item xs={6}>
              <b>{registeredTopic.name}</b>
            </Grid>
          </Grid>
          {/* Topic major */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Chuyên ngành
            </Grid>
            <Grid item xs={6}>
              <b>{registeredTopic.major}</b>
            </Grid>
          </Grid>
          {/* Instructor */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Giáo viên hướng dẫn
            </Grid>
            <Grid item xs={6}>
              <b>{registeredTopic.instructor}</b>
            </Grid>
          </Grid>
          {/* Reviewer */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Giáo viên phản biện
            </Grid>
            <Grid item xs={6}>
              <b>{registeredTopic.reviewer}</b>
            </Grid>
          </Grid>
          {/* Quantity */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Số lượng thành viên
            </Grid>
            <Grid item xs={6}>
              <b>{(registeredTopic.studentlist)?.length} / 3 tổng thành viên</b>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseJoinModal}>
            Hủy
          </Button>
          <LoadingButton
            type="submit"
            color="primary"
            loading={loading}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Đăng ký tham gia đề tài
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} variant="filled">
          Bạn đã đăng ký tham gia đề tài này.
        </Alert>
      </Snackbar>
    </Box >
  );
};

export default PaginationTable;
