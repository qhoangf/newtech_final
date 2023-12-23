import { LoadingButton } from '@mui/lab';
import { Alert, Card, Grid, Snackbar, TextField } from '@mui/material';
import { Box, styled } from '@mui/material';
import { userLogin } from 'app/lib/api/user';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userCheckAuthen } from 'app/lib/api/user';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  username: '',
  password: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, 'Tên đăng nhập có ít nhất 8 kí tự')
    .required('Cần nhập tên đăng nhập để đăng nhập!'),
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 kí tự')
    .required('Cần nhập mật khẩu để đăng nhập!'),
});

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const request = { "username": values.username, "password": values.password };

      const [result, err] = await userLogin(request);
      if (result) {
        console.log("Login successfully", result);
        setLoading(true);
        checkAuthen()
      } else {
        console.log("Login fail", err);
        setOpen(true);
        setLoading(false);
      }
    } catch (e) {
      console.log("Process login fail", e);
      setLoading(false);
    }
  };

  const checkAuthen = async () => {
    try {
      const result = await userCheckAuthen();
      if (result) {
        console.log("Check authen successfully", result);
        localStorage.userInfo = JSON.stringify(result.content);

        switch (result.content.role) {
          case "admin":
            navigate('/admin/teacher');
            break;
          case "student":
            navigate('/student/topiclist');
            break;
          case "lecturer":
            navigate('/teacher/topiclist');
            break;
        }
      } else {
        console.log("Check authen fail");
      }
    } catch (e) {
      console.log("Check authen fail", e);
    }
  }

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/hcmute/ute_logo_white.png" width="70%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Tên đăng nhập"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values?.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mật khẩu"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values?.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Đăng nhập
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
          Tài khoản hoặc mật khẩu không đúng!
        </Alert>
      </Snackbar>
    </JWTRoot>
  );
};

export default Signin;
