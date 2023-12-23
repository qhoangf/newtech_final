import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
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
  Tooltip,
} from "@mui/material";
import { topicGetAll, topicUpdate } from "app/lib/api/topic";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useEffect, useState } from "react";

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
  const [subscribarList, setMyTopicData] = useState([]);
  const [isRendered, isRenderedTable] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const getAllTopic = async () => {
    try {
      const result = await topicGetAll();
      if (result) {
        console.log("Get all topic successfully", result);

        const username = JSON.parse(localStorage.userInfo).name;
        setFilteredData((result.content).filter(item =>
          item.instructor === username
        ));
      } else {
        console.log("Get all topic fail");
      }
    } catch (e) {
      console.log("Process get all topic fail", e);
    }
  }

  useEffect(() => {
    setMyTopicData(filteredData);
    isRenderedTable(false);
  }, [filteredData]);

  useEffect(() => {
    getAllTopic();
  }, [isRendered]);


  // Modal Delete
  const [openDeleteModal, setOpenDelete] = useState(false);
  const [chosenTopic, setChosenTopic] = useState({});
  const handleClickOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);
  const handleSubmitDeleteModal = async () => {
    try {

      const request = {
        "userId": JSON.parse(localStorage.userInfo)._id,
        "topicId": chosenTopic._id,
        "name": chosenTopic.name,
        "major": chosenTopic.major,
        "instructor": "",
        "isApproved": chosenTopic.isApproved,
        "reviewer": chosenTopic.reviewer,
        "students": chosenTopic.students,
      };

      const [result, err] = await topicUpdate(request);
      if (result) {
        console.log("Remove reviewer successfully", result);
        setOpenDelete(false);
        isRenderedTable(true);
      } else {
        console.log("Remove reviewer successfully", err);
      }
    } catch (e) {
      console.log("Process removing reviewer successfully fail", e);
    }
  };

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
            <TableCell align="center">Số lượng sinh viên đã đăng ký</TableCell>
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
                  {(subscriber.isApproved)
                    ?
                    <Tooltip title="Đã duyệt">
                      <IconButton>
                        <Icon color="success">done</Icon>
                      </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Chờ duyệt">
                      <IconButton>
                        <AccessTimeIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  }
                  <IconButton onClick={() => { handleClickOpenDeleteModal(); setChosenTopic(subscriber) }}>
                    <Icon color="error">deleteforever</Icon>
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

      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn hủy hướng dẫn đề tài này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="error">
            Hủy
          </Button>
          <Button onClick={handleSubmitDeleteModal} variant="outlined" color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaginationTable;
