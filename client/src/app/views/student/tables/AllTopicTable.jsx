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
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { topicGetAll, topicEnroll } from 'app/lib/api/topic';

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
  // Topic
  const [subscribarList, setAllTopicData] = useState([]);
  const [isRendered, isRenderedTable] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const getAllTopic = async () => {
    try {
      const result = await topicGetAll();
      if (result) {
        console.log("Update topic successfully", result);
        setFilteredData((result.content).filter(item => item.major === JSON.parse(localStorage.userInfo).major));
      } else {
        console.log("Update topic fail");
      }
    } catch (e) {
      console.log("Process update topic fail", e);
    }
  }

  useEffect(() => {
    setAllTopicData(filteredData);
    isRenderedTable(false);
  }, [filteredData]);

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
        "userId": JSON.parse(localStorage.userInfo)._id,
        "name": JSON.parse(localStorage.userInfo).name,
        "topicId": registeredTopic._id,
      };

      console.log(request)
      const [result, err] = await topicEnroll(request);
      if (result) {
        console.log("Enroll successfully", result);
        setOpenJoinModal(false);
        setLoading(false);
        isRenderedTable(true);
      } else {
        console.log("Enroll fail", err);
        handleClickSnackbarError()
        setLoading(false);
      }
    } catch (e) {
      console.log("Process enroll fail", e);
      setLoading(false);
    }
  }

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

  // Menu students
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuStudents = Boolean(anchorEl);
  const handleClickStudentsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseStudentsMenu = () => {
    setAnchorEl(null);
  };

  // Check isInTopic
  const isUserInStudents = (data) => {
    let useridToCheck = JSON.parse(localStorage.userInfo)._id;
    if (data && data.students && data.students.length > 0) {
      return data.students.some(student => student.id == useridToCheck);
    }
    return false;
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
                <TableCell align="center">{(subscriber.instructor)}</TableCell>
                <TableCell align="center">{(subscriber.reviewer)}</TableCell>
                <TableCell align="center">{(subscriber.students)?.length}</TableCell>
                <TableCell align="right">
                  {(isUserInStudents(subscriber))
                    ?
                    <IconButton onClick={handleClickSnackbar}>
                      <Icon color="success">done</Icon>
                    </IconButton>
                    :
                    <IconButton onClick={() => { handleClickOpenJoinModal(); setRegisteredTopic(subscriber) }}>
                      <Icon color="primary">addcircleoutline</Icon>
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

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
              {(() => {
                switch (registeredTopic.major?.toLowerCase()) {
                  case "software":
                    return "Phần mềm";
                  case "hardware":
                    return "Phần cứng";
                  case "security":
                    return "An ninh mạng";
                  default:
                    return registeredTopic.major;
                }
              })()}
            </Grid>
          </Grid>
          {/* Instructor */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
              Giáo viên hướng dẫn
            </Grid>
            <Grid item xs={6}>
              <b>{registeredTopic.lecturer}</b>
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
              <Button
                color={((registeredTopic.students)?.length == 3) ? "success" : "secondary"}
                aria-controls={openMenuStudents ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenuStudents ? 'true' : undefined}
                onClick={handleClickStudentsMenu}>
                <b>{(registeredTopic.students)?.length} / 3 tổng thành viên đã tham gia</b>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenuStudents}
                onClose={handleCloseStudentsMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {
                  ((registeredTopic.students)?.length == 0) ?
                    <>
                      <MenuItem onClick={handleCloseStudentsMenu}>Chưa có thành viên nào tham gia</MenuItem>
                    </> :
                    registeredTopic.students
                      ?.map((registeredTopicChild, index) => (
                        <MenuItem key={index} onClick={handleCloseStudentsMenu}>
                          {`${registeredTopicChild.name} (${registeredTopicChild.id})`}
                        </MenuItem>
                      ))
                }
              </Menu>
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
            onClick={handleEnrollTopic}
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

      <Snackbar open={openSnackbarError} autoHideDuration={5000} onClose={handleCloseSnackbarError}>
        <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }} variant="filled">
          Bạn đã tham gia đề tài khác.
        </Alert>
      </Snackbar>

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
    </Box >
  );
};

export default PaginationTable;
