import { Card, Checkbox, Grid, TextField, styled, useTheme } from '@mui/material';
import PaginationTable from "./tables/TopicTable";
import * as Yup from 'yup';
import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const H2 = styled('h2')(({ theme }) => ({
    color: 'red',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginBottom: '16px',
}));

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));

const initialValues = {
    nameTopic: '',
    majorTopic: '',
};

const validationSchema = Yup.object().shape({
    nameTopic: Yup.string()
        .min(6, 'Tên đề tài phải nhiều hơn 6 kí tự')
        .required('Bắt buộc phải có tên đề tài!'),
    majorTopic: Yup.string()
        .min(6, 'Chuyên ngành phải nhiều hơn 6 kí tự')
        .required('Bắt buộc phải có chuyên ngành!'),
});

const Topic = () => {
    const [loading, setLoading] = useState(false);
    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            console.log("Do something", values);
        } catch (e) {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <H4>Đề tài</H4>
                        <PaginationTable />
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
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="nameTopic"
                                                name="nameTopic"
                                                label="Tên đề tài"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.nameTopic}
                                                onChange={handleChange}
                                                helperText={touched.nameTopic && errors.nameTopic}
                                                error={Boolean(errors.nameTopic && touched.nameTopic)}
                                                sx={{ mb: 3 }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="majorTopic"
                                                type="majorTopic"
                                                label="Chuyên ngành"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.majorTopic}
                                                onChange={handleChange}
                                                helperText={touched.majorTopic && errors.majorTopic}
                                                error={Boolean(errors.majorTopic && touched.majorTopic)}
                                                sx={{ mb: 1.5 }}
                                            />

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
                            <H2>*Đề tài sẽ hết hạn sau 60 ngày kể từ khi tạo</H2>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Topic;
