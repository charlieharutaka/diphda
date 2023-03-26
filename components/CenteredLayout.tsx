import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

type CenteredLayoutProps = React.PropsWithChildren<{ sx?: SxProps }>;

export default function CenteredLayout({ children, sx }: CenteredLayoutProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      sx={sx}
    >
      {children}
    </Box>
  );
}
