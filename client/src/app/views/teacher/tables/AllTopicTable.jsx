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
} from "@mui/material";

import React, { useState } from "react";
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
    topicname: "john doe",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "kessy bryan",
    topicmajor: "My Fintech LTD.",
  },
  {
    topicname: "kessy bryan",
    topicmajor: "My Fintech LTD.",
  },
  {
    topicname: "james cassegne",
    topicmajor: "Collboy Tech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
  },
  {
    topicname: "lucy brown",
    topicmajor: "ABC Fintech LTD.",
    studentlist: [],
  },
];

const PaginationTable = () => {
  // Join modal
  const [openJoinTopicModal, setOpenJoinModal] = useState(false);
  const handleClickOpenJoinModal = () => setOpenJoinModal(true);
  const handleCloseJoinModal = () => setOpenJoinModal(false);

  // Edit Submit
  const [loading, setLoading] = useState(false);

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
                <TableCell align="left">{subscriber.topicname}</TableCell>
                <TableCell align="center">{subscriber.topicmajor}</TableCell>
                <TableCell align="center">{subscriber.instructor}</TableCell>
                <TableCell align="center">{subscriber.reviewer}</TableCell>
                <TableCell align="center">{subscriber.quantity}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleClickOpenJoinModal}>
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
      <Dialog open={openJoinTopicModal} onClose={handleCloseJoinModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thông tin đăng ký đề tài</DialogTitle>
        <DialogContent>

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
            Đăng ký
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} variant="filled">
          Bạn đã đăng ký đề tài này.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaginationTable;
