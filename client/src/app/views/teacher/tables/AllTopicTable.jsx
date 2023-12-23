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
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { topicGetAll, topicUpdate } from 'app/lib/api/topic';

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

const PaginationTable = () => {
  const [subscribarList, setAllTopicData] = useState([]);
  const [isRendered, isRenderedTable] = useState(false);

  const getAllTopic = async () => {
    try {
      const result = await topicGetAll();
      if (result) {
        console.log("Update topic successfully", result);
        setAllTopicData(result.content);
        isRenderedTable(false);
      } else {
        console.log("Update topic fail");
      }
    } catch (e) {
      console.log("Process update topic fail", e);
    }
  }

  useEffect(() => {
    getAllTopic();
  }, [isRendered]);

  const [loading, setLoading] = useState(false);
  const [registeredTopic, setRegisteredTopic] = useState({});

  // Join modal
  const [openJoinTopicModal, setOpenJoinModal] = useState(false);
  const handleClickOpenJoinModal = () => setOpenJoinModal(true);
  const handleCloseJoinModal = () => setOpenJoinModal(false);
  const handleEnrollTopic = async () => {
    setLoading(true);
    try {
      const request = {
        "topicId": registeredTopic._id,
        "name": registeredTopic.name,
        "major": registeredTopic.major,
        "instructor": `${JSON.parse(localStorage.userInfo).name} (${JSON.parse(localStorage.userInfo)._id})`,
        "isApproved": false,
        "reviewer": "",
        "students": registeredTopic.students,
      };

      console.log(request)
      const [result, err] = await topicUpdate(request);
      if (result) {
        console.log("Update successfully", result);
        setOpenJoinModal(false);
        setLoading(false);
        isRenderedTable(true);
      } else {
        console.log("Update fail", err);
        handleClickSnackbarError()
        setLoading(false);
      }
    } catch (e) {
      console.log("Process update fail", e);
      setLoading(false);
    }
  }

  // Add reviewer modal
  const [openAddReviewerModal, setOpenAddReviewerModal] = useState(false);
  const handleClickAddReviewerModal = () => setOpenAddReviewerModal(true);
  const handleCloseAddReviewerModal = () => setOpenAddReviewerModal(false);

  // Reviewer menu
  const [reviewerValue, setReviewer] = React.useState('');
  const handleSelectorChange = (event) => {
    setReviewer(event.target.value);
  };

  // Noti error
  const [openSnackbarError, setOpenError] = React.useState(false);
  function handleClickSnackbarError() {
    setOpenError(true);
  }
  function handleCloseSnackbarError(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  }

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
            <TableCell align="center">Số lượng sinh viên (Tối đa: 3)</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribarList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell align="left">{subscriber.name}</TableCell>
                <TableCell align="center">
                  {(() => {
                    switch (subscriber.major?.toLowerCase()) {
                      case "software":
                        return "Phần mềm";
                      case "hardware":
                        return "Phần cứng";
                      case "security":
                        return "An ninh mạng";
                      default:
                        return subscriber.major;
                    }
                  })()}
                </TableCell>
                <TableCell align="center">{(subscriber.instructor).replaceAll(" ", "\n")}</TableCell>
                <TableCell align="center">{(subscriber.reviewer).replaceAll(" ", "\n")}</TableCell>
                <TableCell align="center">{(subscriber.students)?.length}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => { handleClickOpenJoinModal(); setRegisteredTopic(subscriber) }}>
                    <Icon color="primary">addcircleoutline</Icon>
                  </IconButton>
                  <IconButton onClick={handleClickSnackbar}>
                    <Icon color="success">done</Icon>
                  </IconButton>
                  {(JSON.parse(localStorage.userInfo).role == "lecturer" && JSON.parse(localStorage.userInfo).isLeader == true)
                    ? <IconButton onClick={() => { handleClickAddReviewerModal() }}>
                      <PersonAddIcon color="primary" />
                    </IconButton> : <></>}
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
              {registeredTopic.lecturer ? (
                <>
                  {registeredTopic.lecturer}{" "}
                  {registeredTopic.isApproved ? (
                    <b style={{ color: "#2e7d32" }}>(Đã duyệt)</b>
                  ) : (
                    <b style={{ color: "#FFAF38" }}>(Chờ duyệt)</b>
                  )}
                </>
              ) : (
                <></>
              )}
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
              Số lượng sinh viên
            </Grid>
            <Grid item xs={6}>
              <b>{(registeredTopic.students)?.length} / 3 tổng sinh viên đã tham gia</b>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseJoinModal}>
            Hủy
          </Button>
          {(!registeredTopic.isApproved && registeredTopic.lecturer) ?
            <Button
              color="error"
              variant="contained"
              onClick={handleCloseJoinModal}>
              Từ chối giảng viên
            </Button> : <></>
          }
          {(!registeredTopic.isApproved && registeredTopic.lecturer) ?
            <Button
              color="success"
              variant="contained"
              onClick={handleCloseJoinModal}
              sx={{ mr: 2 }}>
              Duyệt giảng viên
            </Button> : <></>
          }
          {!registeredTopic.lecturer ?
            <LoadingButton
              type="submit"
              color="primary"
              loading={loading}
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleEnrollTopic}
            >
              Đăng ký hướng dẫn đề tài
            </LoadingButton> :
            <></>
          }
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddReviewerModal}
        onClose={handleCloseAddReviewerModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Thông tin giáo viên phản biện</DialogTitle>
        <DialogContent id="alert-dialog-description"
          style={{ width: "600px" }}>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-label">Giáo viên phản biện</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reviewerValue}
              label="Giáo viên phản biện"
              onChange={handleSelectorChange}
            >
              <MenuItem value={"GV A"}>GV A</MenuItem>
              <MenuItem value={"GV B"}>GV B</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseAddReviewerModal}>
            Hủy
          </Button>
          <LoadingButton
            type="submit"
            color="primary"
            loading={loading}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Chọn giáo viên phản biện
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }} variant="filled">
          Bạn đã đăng ký hướng dẫn đề tài này.
        </Alert>
      </Snackbar>

      <Snackbar open={openSnackbarError} autoHideDuration={5000} onClose={handleCloseSnackbarError}>
        <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }} variant="filled">
          Bạn đã tham gia đề tài khác.
        </Alert>
      </Snackbar>
    </Box >
  );
};

export default PaginationTable;
