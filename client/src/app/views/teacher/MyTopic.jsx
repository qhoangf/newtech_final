import { styled } from '@mui/material';
import PaginationTable from "./tables/MyTopicTable";
import { Fragment } from 'react';

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

const TopicList = () => {
    return (
        <Fragment>
            <ContentBox className="analytics">
                <H4>Đề tài của tôi</H4>
                <PaginationTable />
            </ContentBox>
        </Fragment>
    );
};

export default TopicList;
