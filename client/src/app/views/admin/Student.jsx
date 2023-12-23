import { Card, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, styled } from '@mui/material';
import PaginationTable from "./tables/StudentTable";
import * as Yup from 'yup';
import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { userRegister } from 'app/lib/api/user';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));

const initialValues = {
    name: '',
    username: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(6, 'Tên sinh viên phải nhiều hơn 6 kí tự')
        .required('Bắt buộc phải có tên sinh viên!'),
    username: Yup.string()
        .min(8, 'Tên đăng nhập phải nhiều hơn 8 kí tự')
        .required('Bắt buộc phải có tên đăng nhập!'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải nhiều hơn 6 kí tự')
        .required('Bắt buộc phải có mật khẩu!'),
});

const Student = () => {
    const [loading, setLoading] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const handleReload = () => {
        if (reloadKey > 1)
            setReloadKey(reloadKey - 1);
        else
            setReloadKey(reloadKey + 1);
    };

    const [majorValue, setMajorValue] = useState("software");
    const handleChangeRadioGroup = (event) => {
        setMajorValue(event.target.value);
    };
    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            const request = {
                "name": values.name,
                "username": values.username,
                "password": values.password,
                "major": majorValue,
                "role": "student",
            };

            console.log(request)
            const [result, err] = await userRegister(request);
            if (result) {
                console.log("Register successfully", result);
                setLoading(false);
                handleReload();
            } else {
                console.log("Register fail", err);
                setLoading(false);
            }
        } catch (e) {
            console.log("Process register fail", e);
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <H4>Tài khoản sinh viên</H4>
                        <PaginationTable isReload={reloadKey} />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                            <H4>Chức năng</H4>
                            <ContentBox>
                                <Formik
                                    onSubmit={handleFormSubmit}
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            <FormLabel id="info">Thông tin cá nhân</FormLabel>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="name"
                                                name="name"
                                                label="Tên sinh viên"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.name}
                                                onChange={handleChange}
                                                helperText={touched.name && errors.name}
                                                error={Boolean(errors.name && touched.name)}
                                                sx={{ mb: 1.5, mt: 1.5 }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="username"
                                                type="username"
                                                label="Tên đăng nhập"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.username}
                                                onChange={handleChange}
                                                helperText={touched.username && errors.username}
                                                error={Boolean(errors.username && touched.username)}
                                                sx={{ mb: 1.5 }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="password"
                                                type="password"
                                                label="Mật khẩu"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.password}
                                                onChange={handleChange}
                                                helperText={touched.password && errors.password}
                                                error={Boolean(errors.password && touched.password)}
                                                sx={{ mb: 1.5 }}
                                            />


                                            <FormControl>
                                                <FormLabel id="major">Chuyên ngành</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="major"
                                                    defaultValue="software"
                                                    name="major"
                                                    onChange={handleChangeRadioGroup}
                                                >
                                                    <FormControlLabel value="software" control={<Radio />} label="Phần mềm" />
                                                    <FormControlLabel value="hardware" control={<Radio />} label="Phần cứng" />
                                                    <FormControlLabel value="security" control={<Radio />} label="An ninh mạng" />
                                                </RadioGroup>
                                            </FormControl>

                                            <LoadingButton
                                                type="submit"
                                                color="primary"
                                                loading={loading}
                                                variant="contained"
                                                sx={{ my: 2 }}
                                            >
                                                Tạo mới
                                            </LoadingButton>
                                        </form>
                                    )}
                                </Formik>
                            </ContentBox>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Student;
