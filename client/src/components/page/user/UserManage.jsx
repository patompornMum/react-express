import * as React from 'react';
import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Container } from '@mui/material';

//service
import { deleteUser, list } from '../../../services/user';

//redux
import { useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';

export default function UserManage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //redux
  const { user: reduxUser } = useSelector((state) => ({ ...state }));
  const token = reduxUser.info.token;

  useEffect(() => {
    loadDataUser(token);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = async (id) => {
    console.log(`Delete ${id}`);
    await deleteUser(token, id)
      .then((res) => {
        alert(res.data.msg)
        loadDataUser(token)
      })
      .catch((err) => console.log(err))
  }

  const loadDataUser = async (token) => {
    console.log('LoadData')
    await list(token)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Tool</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        {item.username}
                      </TableCell>
                      <TableCell>
                        {item.role}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
