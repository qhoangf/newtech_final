import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components/common/others';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import { Span } from '../../common/others/Typography';
import { userLogout } from 'app/lib/api/user';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const logout = async () => {
    try {
      const result = await userLogout();
      if (result) {
        console.log("Logout successfully", result);
        localStorage.clear();
        navigate('/session/signin');
      } else {
        console.log("Logout fail");
      }
    } catch (e) {
      console.log("Process logout fail", e);
    }
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Xin chào, <strong>{
                      JSON.parse(localStorage.userInfo).name ?? "Quản trị viên"
                    }</strong>
                  </Span>
                </Hidden>
              </UserMenu>
            }
          >
            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Đăng xuất </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
