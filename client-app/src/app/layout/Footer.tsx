import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { AppBar, Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { FC, ReactElement } from "react";

const facebookLink = 'https://www.facebook.com/ahmedtariq8';
const linkedInLink = 'https://www.linkedin.com/in/ahmedtariq08/';
const instaLink = 'https://www.instagram.com/ahmedtariq08/';
const githubLink = 'https://github.com/Ahmedtariq08';
const mailLink = 'mailto:ahmedtariq92331@gmail.com';
const currentYear = new Date().getFullYear();

const copyRights = `©Copyright ${currentYear}. All Rights Reserved.`

export const Footer: FC = (): ReactElement => {
    return (
        <AppBar position="static" sx={{ position: 'fixed', bottom: 0 }}>
            <Box
                display='flex'
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                margin={'0.5rem 2rem'}
            >
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography><strong>&nbsp; Ahmed Tariq</strong></Typography>
                    <Typography><i>{copyRights}</i></Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}>
                    <IconButton
                        href={facebookLink}
                        title="Facebook"
                        target="_blank"
                        children={<FacebookIcon fontSize="medium" sx={{ color: 'whitesmoke' }} />}
                    />
                    <IconButton
                        href={mailLink}
                        title="Gmail"
                        target="_blank"
                        children={<EmailIcon sx={{ color: 'whitesmoke' }} />}
                    />
                    <IconButton
                        href={instaLink}
                        title="Instagram"
                        target="_blank"
                        children={<InstagramIcon sx={{ color: 'whitesmoke' }} />}
                    />
                    <IconButton
                        href={linkedInLink}
                        title="LinkedIn"
                        target="_blank"
                        children={<LinkedInIcon sx={{ color: 'whitesmoke' }} />}
                    />
                    <IconButton
                        href={githubLink}
                        title="Github"
                        target="_blank"
                        children={<GitHubIcon sx={{ color: 'whitesmoke' }} />}
                    />
                </Box>
            </Box>
        </AppBar>
    );
};

export default Footer;